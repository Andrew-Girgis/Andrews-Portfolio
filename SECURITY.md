# Security Policy

This repository is the source for my personal site, [girg.is](https://girg.is), and its backend API (`sierra-api`, a Cloudflare Worker that powers the Sierra chatbot and meeting booking). I appreciate reports that help keep it, and the people who use it, safe.

## Supported versions

Only the current production deployment (the `main` branch, served at `girg.is`) is supported. Archived branches and older versions of the site are not maintained.

## Reporting a vulnerability

**Please don't open a public issue, pull request or discussion for security problems.**

Report privately through GitHub instead:

1. Go to the [Security tab](https://github.com/Andrew-Girgis/Andrews-Portfolio/security) of this repository.
2. Click **Report a vulnerability**.
3. Include:
   - what you found and where (URL, endpoint or file)
   - steps to reproduce, or a minimal proof of concept
   - the impact you think it has

I'll acknowledge your report within **5 business days** and aim to share a fix plan or decision within **30 days**. This is a personal project maintained by one person, so timelines are best effort. I'm happy to credit you once the issue is fixed, unless you'd rather stay anonymous.

## Scope

In scope:

- The site at `girg.is` and the code in this repository
- The `sierra-api` Worker endpoints under `/api/*`: chat, greeting, health and booking
- Abuse of the Sierra chatbot or booking flow that leads to data exposure, unauthorised actions (for example bookings or messages sent on someone else's behalf), leaked secrets, or significant cost
- GitHub Actions workflows in `.github/workflows/`

Out of scope:

- Vulnerabilities in third-party services themselves (Netlify, Cloudflare, Cal.com, OpenAI, Cohere, Langfuse, Google Analytics). Please report those to the vendor.
- Volumetric denial-of-service, load testing or automated scanning that degrades the service
- Chatbot replies that are merely off-topic, wrong or "jailbroken" without a security impact
- Missing best-practice headers or configuration without a demonstrated exploit
- Social engineering, physical attacks, or issues that require a compromised device

## Guidelines for testing

- Only test against accounts, sessions and data you own.
- Don't access, change or delete other people's data. If you hit any by accident, stop and report it.
- Don't create real meeting bookings or send messages to third parties while testing.
- Keep request volumes low, and stop if you notice degradation.
- Give me reasonable time to fix the issue before disclosing it publicly.

If you follow these guidelines in good faith, I won't pursue or support legal action against you for your research.
