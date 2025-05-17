const OpenAI = require('openai');
const { DateTime } = require('luxon');
const fetch = require('node-fetch');

// In-memory cache with expiration
const cache = {
  greeting: null,
  timestamp: null
};

// Cache duration in milliseconds (15 minutes)
const CACHE_DURATION = 15 * 60 * 1000;

// Check if cache is valid
function isCacheValid() {
  return cache.greeting && cache.timestamp && 
         (Date.now() - cache.timestamp) < CACHE_DURATION;
}

// Get holidays from Nager.Date API
async function getHoliday() {
  try {
    const today = DateTime.now().setZone('America/Toronto').toISODate();
    const response = await fetch(`https://date.nager.at/api/v3/publicholidays/2024/CA`);
    const holidays = await response.json();
    
    const todayHoliday = holidays.find(h => h.date === today);
    return todayHoliday ? `today is ${todayHoliday.name}` : '';
  } catch (error) {
    console.error('Error fetching holidays:', error);
    return '';
  }
}

// Function to wrap emojis in a span
function wrapEmojis(text) {
  // Regex to match emojis
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
  return text.replace(emojiRegex, match => `<span class="greeting-emoji">${match}</span>`);
}

exports.handler = async function(event) {
  // Only handle GET requests
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Check if API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OpenAI API key is not configured');
      throw new Error('OpenAI API key is not configured');
    }

    // Check cache first
    if (isCacheValid()) {
      console.log('Returning cached greeting');
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cache.greeting })
      };
    }

    // Get current time in Toronto
    const now = DateTime.now().setZone('America/Toronto');
    const formattedDate = now.toFormat('yyyy-MM-dd, HH:mm');
    const weekday = now.weekdayLong;
    
    // Get holiday if any
    const holiday = await getHoliday();
    
    console.log('Initializing OpenAI with key:', process.env.OPENAI_API_KEY ? 'Present' : 'Missing');
    
    // Initialize OpenAI
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    // Prepare the prompt
    const timeInfo = `Current time in Toronto: ${formattedDate}, ${weekday}${holiday ? ', ' + holiday : ''}`;
    console.log('Time info:', timeInfo);

    // Generate greeting
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'Generate a dynamic, context-aware greeting of no more than four words—using todays date, day of week, time of day, or any relevant holiday/observance—and append one contextually appropriate emoji at the end (e.g., "Happy Friday! 🎉", "Good morning ☀️", "Merry Christmas! 🎄"). Return only the greeting phrase.'
        },
        {
          role: 'user',
          content: timeInfo
        }
      ],
      max_tokens: 10
    });

    // Get the generated greeting and wrap emojis
    const rawGreeting = completion.choices[0].message.content;
    const greeting = wrapEmojis(rawGreeting);
    console.log('Generated greeting:', greeting);

    // Update cache
    cache.greeting = greeting;
    cache.timestamp = Date.now();

    return {
      statusCode: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ text: greeting })
    };

  } catch (error) {
    console.error('Error in greeting function:', error);
    return {
      statusCode: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
}; 