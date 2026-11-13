---
name: "govuk-style-writer"
description: "Rewrite any text to GOV.UK style, adapted to context (service screens, guidance, letters, emails, SMS, NHS and health, prison and probation, benefits, tax, immigration, functional standards), with optional Welsh following Welsh Government style and Cymraeg Clir. Use whenever the user pastes text and asks to rewrite, simplify, make plain English, check against the style guide, convert to NHS style, or translate into Welsh, even if they don't name GOV.UK. Prefer this over govuk-content-designer for any rewrite or Welsh request."
---

# GOV.UK style writer

Takes any text and returns a version that follows GOV.UK style, tuned to where and how it will be read. Can also produce Welsh.

## Workflow

### 1. Work out the context

Before rewriting, decide four things. Infer them from the text and the request. Only ask the user if a wrong guess would change the output a lot (for example, a staff-facing vs public-facing probation screen).

- **Channel**: service screen (UI), GOV.UK guidance page, letter, email, text message, NHS App message, document or standard
- **Reader**: public, patient, person in prison, person on probation, claimant, taxpayer, applicant, business, staff or practitioner
- **Domain**: general government, health (NHS), justice (MoJ/HMPPS), tax (HMRC), benefits (DWP), immigration (Home Office), Wales (Welsh Government), functional standard (Cabinet Office)
- **Language**: English only, Welsh only, or both

State the context you assumed in one line at the top of your output.

### 2. Use the sections you need

Always apply "Reference: govuk-core" below. Then use only the sections the context calls for:

| Context | Read |
|---|---|
| Service screens, questions, errors, buttons, confirmation pages | "Reference: ui-content" |
| Letters, emails, text messages, NHS App messages | "Reference: channels" |
| Health, NHS, patients, clinical | "Reference: nhs-health" |
| Prison, probation, courts, MoJ, HMPPS | "Reference: justice" |
| HMRC, DWP, Home Office, Welsh Government | "Reference: departments" |
| Functional standards, policy standards, requirements documents | "Reference: functional-standards" |
| Any Welsh output | "Reference: welsh" |

Where a domain guide conflicts with GOV.UK core, the domain guide wins for that domain. "Reference: govuk-core" has a conflicts table.

### 3. Rewrite

In this order:

1. Find the reader's task: what they need to know, do, by when, and what happens next.
2. Cut anything that does not help with that task (background, internal process, organisational throat-clearing).
3. Front-load: the most important thing first, in the title or first sentence.
4. Rewrite in plain English using the rules in the references.
5. Structure for the channel (headings, lists, length limits).
6. Apply the style rules (dates, numbers, capitals, punctuation, terms).
7. Check the meaning has not changed (see "Preserve meaning").

### 4. Preserve meaning

Never invent or change: eligibility, deadlines, amounts, legal duties, consequences, contact details, processing times, clinical advice, licence conditions.

Keep legally significant distinctions: must/need to/can, may/will, working days/calendar days, gross/net, submitted/approved, estimated/confirmed.

If the source is ambiguous in a way that would change what the reader does, do not pick silently. Flag it under "Check before publishing".

Clinical content and legal or enforcement content must be checked by the relevant professional before publishing. Say so once, briefly, when the text is clinical or legal.

### 5. Welsh

If Welsh is asked for, write the English first, then produce Welsh from the finished English (not from the original). Follow "Reference: welsh". Always end Welsh output with the note that it must be checked by a qualified Welsh translator before publication.

## Output format

```
Context: [channel] for [reader], [domain]

[Rewritten text, formatted for the channel]

[Welsh version, if asked, under its own heading]

Changes
- [3 to 6 bullets on the main changes, only the ones that are not obvious]

Check before publishing
- [facts, legal meanings or ambiguities the user needs to confirm]
```

Leave out "Changes" if the user only wants the text. Leave out "Check before publishing" if there is nothing to check. Do not list every small edit.

If the user asks for a review instead of a rewrite, give findings under: what works, problems (most serious first), recommended changes.

## Final check

Before replying, check the rewrite against this list:

- Could someone with a reading age of 9 to 11 understand it on one read? (NHS and prison: aim for this. General GOV.UK: aim for it, accept slightly higher for specialist audiences.)
- Is the action and deadline clear in the first few lines?
- Sentences mostly under 20 to 25 words, paragraphs 5 sentences or fewer (3 for NHS)?
- No words from the words-to-avoid list, no negative contractions, no "eg/ie/etc", no ampersands, no semicolons, no italics, no block capitals?
- Dates like 6 October 2026, times like 5:30pm (or 24-hour where the domain says so), money like £75 or £75.50?
- Link text describes the destination?
- Tone fits the situation (calm and direct for bad news or enforcement; no "please be advised", no "sorry for any inconvenience")?
- Meaning, legal effect and clinical accuracy unchanged?

---

# Reference: govuk-core

Source: GOV.UK content and publishing guidance (guidance.publishing.service.gov.uk), including the A to Z style guide, writing guidelines and text formatting pages. Applies to everything unless a domain reference overrides it.

### 1. Plain English

Plain English is mandatory on GOV.UK. Around 1 in 6 adults in England have very poor literacy, and specialists also prefer plain English because it is faster to read.

- Use short, common words: buy (not purchase), help (not assist), about (not regarding), start (not commence), use (not utilise), before (not prior to), so (not therefore), give (not provide).
- Avoid nouns made from verbs (words ending -ion, -ment): "decide" not "make a decision", "apply" not "submit an application".
- Use active voice: "You need a licence" not "A licence is required". Passive is fine when the outcome matters more than who did it.
- Aim for sentences under 25 words. Split longer ones. One idea per sentence.
- Paragraphs: 5 sentences maximum.
- Use specialist or technical terms only when needed, and explain them at first mention. Use the words users search for.
- Legal content still goes in plain English. Explain legal terms.

#### Obligation words

- **must**: a legal requirement with serious consequences. Use "legally entitled to" or "legally responsible for" for emphasis if needed.
- **need to**: an administrative requirement without serious legal consequences.
- **can**: optional.
- **may**: something that might happen, or permission. Never use "will" for something that only sometimes happens.

#### Contractions

- Positive contractions are fine, used sparingly: you'll, we'll, you're, it's.
- Do not use negative contractions: write cannot, do not, will not, is not, should not.
- Do not use should've, could've, would've.
- Some audiences (Home Office, people with English as an additional language) avoid contractions altogether. See "Reference: departments".

### 2. Tone and address

- Specific, informative, clear, concise, brisk but not terse. Human, not a faceless machine. Serious but not pompous.
- Write as if talking one-to-one to the reader, with the authority of someone who can help.
- Address the reader as "you".
- Use "we" only where it is obvious who "we" is, or after naming the organisation once.
- Usually no need for "please": "Contact us" not "Please contact us". Use "please" only where you are asking for something inconvenient.
- No "kindly", "please be advised", "please note", "we apologise for any inconvenience".
- Gender-neutral: "they", not "he or she". Use "women and men", not "females and males".
- No block capitals for running text. It reads as shouting.
- No subjective or promotional language.
- Do not blame the reader for system or process problems.

### 3. Structure

People scan. They read 20 to 28% of a web page, in an F-shape.

- Front-load: most important information first (inverted pyramid). Key words at the start of titles, headings, sentences and link text.
- Do not repeat the summary in the first paragraph.
- Titles: 65 characters max, unique, descriptive, front-loaded, not questions, no full stops, dashes or slashes. Colons are fine.
- Headings: sentence case, descriptive, front-loaded, action-led where possible ("Apply for a licence"), not questions, not "Introduction" or "Other information". They must make sense out of context.
- Heading levels: page title is H1, content starts at H2, never skip a level. Do not use bold instead of a heading (screen readers will not recognise it).
- No footnotes on web pages. Move important information into the text or remove it.
- No FAQs. Put the answers where they belong in the content.

### 4. Formatting

#### Bullet points
- Always use a lead-in line, usually ending in a colon.
- Bullets start lower case and make sense running on from the lead-in.
- One sentence per bullet maximum.
- No full stop, comma, "and" or "or" at the end of bullets, including the last one. No semicolons.
- If bullets are full sentences or there is no lead-in, start with a capital and end with a full stop.

#### Numbered lists and steps
- Use numbers when order matters (a process or steps).
- Each step starts with a capital letter and ends with a full stop.

#### Bold and italics
- Bold only for interface elements in instructions (Select **Continue**), and sparingly. Not for emphasis.
- No italics. Use single quotation marks for titles of publications and unusual terms.
- No underlining except links.

#### Links
- Link text describes where it goes. Front-load it. Never "click here", "read more", "this page".
- Use "select", not "click".
- Link to online services first.
- Do not put the full stop inside link text.
- Avoid anchor links.
- Email addresses: written in full, lower case, as active links.

#### Tables
- Use only for data, not layout. Always have a header row. Bank details go in bullets, not tables.

#### Contact details
- Telephone: spaces in numbers (0300 123 4567), separate country and area codes ("+44 (0)20 7946 0000"). Give opening hours ("Monday to Friday, 8am to 6pm") and link to call charges where relevant.
- UK addresses: each part on a new line, no commas, town and postcode on separate lines, country after postcode if needed.

#### Abbreviations and acronyms
- Spell out in full at first use, followed by the acronym in brackets, then use the acronym. If the acronym is better known than the full name (BBC, VAT, NHS, UK), you do not need to spell it out.
- No full stops in acronyms (BBC not B.B.C.).
- Do not create acronyms that users will not know.

### 5. Punctuation and grammar

- No ampersands (&) unless part of a logo or company name.
- No "eg", "ie" or "etc". Use "for example", "such as", "like", "including", "that is", "meaning".
- No semicolons. Split into two sentences.
- No "and/or". Use "or", "and", or rewrite.
- No "(s)" for singular or plural. Use the plural.
- Round brackets are fine. Avoid nesting.
- Quotation marks: single quotes for unusual terms, titles of publications and interface elements. Double quotes only for direct quotes from a person.
- One space after a full stop.
- Hyphenate "re-" words where the next letter is e (re-evaluate, re-enter). Also co-ordinate, co-operate. Do not hyphenate reuse, reinvent, email, online.
- Data is singular ("the data is").
- Organisations are singular ("HMRC is").
- Do not use exclamation marks.
- Never use long em dashes in output. Rewrite with a full stop, comma or brackets.

### 6. Numbers, dates, times, money

#### Numbers
- Use "one" in prose unless it is a step, a list point or numerals make more sense. Use numerals for everything else, including 2 to 9.
- Spell out a number that starts a sentence, or rewrite so it does not start the sentence.
- Commas in numbers over 999: 1,000 and 10,000.
- Ordinals: spell out first to ninth, then 10th, 11th.
- Use "million" and "billion" in money: £138 million. Do not write £0.xx billion.
- Per cent: use % with numerals (50%). "Per cent" is two words in prose without a number.
- Measurements: numerals, no space before the unit (3,500kg, 25km). Spell out the unit at first use if users may not know it. Use Celsius (37°C).

#### Dates
- 6 October 2026. Day of week if useful: Tuesday 6 October 2026.
- No ordinals (not 6th October), no comma between month and year, no abbreviated months, no numeric dates like 06/10/26 in prose.
- Ranges use "to": 6 to 10 October 2026, not hyphens.
- Include the year unless it is obvious.
- Tax years: 2026 to 2027.

#### Times
- 5:30pm, 9am, midday, midnight. Not 17:30, 5.30pm, 12pm, 12am, 1700hrs.
- Ranges use "to": 10am to 11am.
- Durations: 6 hours 30 minutes.
- Exception: MoJ staff-facing services use 24-hour clock. See "Reference: justice".

#### Money
- £75, not £75.00. £75.50 when pence are included. Write pence in full in prose: 50 pence or 50p (be consistent).
- Use the currency name or code if not pounds: 1,000 euros or 1,000 EUR.

#### Ages
- Use "aged 18 or over", "under 18". No hyphens unless needed for clarity.

### 7. Capitals and terms (A to Z selection)

General rule: sentence case for everything except proper nouns. Capitalise named things, not generic ones.

| Term | Rule |
|---|---|
| government | lower case, except Welsh Government, Scottish Government |
| UK government | never "HM government" |
| department, minister, director | lower case unless the full title (Department for Education, Minister for Housing) |
| Secretary of State | title case |
| act, regulations, bill | lower case unless the full title |
| Parliament | title case |
| local council | use "local council" not "local authority" (GOV.WALES differs) |
| Council Tax, Universal Credit, State Pension, Income Tax, Jobseeker's Allowance, Direct Debit, National Insurance number | title case (benefit, tax and scheme names) |
| tax credits | lower case generically, title case for named ones (Working Tax Credit) |
| Self Assessment | title case as a noun, hyphenate as self-assessment only as a compound adjective |
| COVID-19 | upper case |
| GOV.UK, GOV.UK One Login | as written. One Login is not an "account" |
| sign in, sign out | not log in, login (noun) |
| email, online, webpage, webchat, wifi, username, data set | as written |
| page | use "page", not "screen", for web and app pages |
| disabled people | not "the disabled" or "people with disabilities" |
| ethnic minorities | not BAME or BME. Refer to groups individually where possible |
| Gypsies, Travellers, Irish Travellers | title case |
| fine | not "financial penalty" |
| USA | not "US" |
| north, south, east, west | lower case. Regions title case (South West) |
| the King | lower case "the" |
| year 1, key stage 4 | lower case, numerals |
| GCSE, A level, T Level | as written, no apostrophe in plurals (GCSEs) |
| zero-hours contract | hyphenated |
| Senedd Cymru (Welsh Parliament) | full name first, then "the Senedd" |

### 8. Words to avoid

Replace with plain words that say what actually happens.

agenda (plan), advance, collaborate (work with), combat (stop, reduce), commit or pledge (say what you are doing), counter, deliver (except post or goods: make, provide), deploy (use, put in place), dialogue (talk, discussion), disincentivise, empower (let, allow), facilitate (help, run), focus, foster (encourage), impact as a verb (affect, change), incentivise, initiate (start), key (important, main, or cut), land as a verb, leverage, liaise (work with), overarching, progress as a verb (work on, develop), promote (except an ad campaign), robust, slim down, streamline, strengthen, tackle, transform, utilise (use).

Also avoid metaphors: drive, drive out, going forward, hub, ring fencing, one-stop shop, touch base. Use "to" not "in order to".

Avoid: "Please be advised", "At this point in time", "With regard to", "Further to", "Pursuant to", "Hereby", "Forthwith", "Notwithstanding".

"click": use "select". "FAQs": do not use.

### 9. Conflicts between guides

When rules conflict, the domain guide wins for its domain.

| Topic | GOV.UK | NHS | MoJ / HMPPS | HMRC | Home Office | Functional standards | GOV.WALES |
|---|---|---|---|---|---|---|---|
| Contractions | positive OK, no negative | positive OK, no negative | GOV.UK | GOV.UK | avoid all contractions | avoid | GOV.UK |
| Number 1 | "one" in prose | numerals for all, including 1 | GOV.UK | GOV.UK | GOV.UK | GOV.UK | GOV.UK |
| Times | 5:30pm | 5:30pm | 24-hour (14:00) for staff services | GOV.UK | GOV.UK | GOV.UK | GOV.UK |
| Obligation | must = legal | avoid "should" (patronising) | GOV.UK | GOV.UK | GOV.UK | shall / should / may, no must or will | GOV.UK |
| Quote marks | single for terms | straight double for sources and unusual terms | GOV.UK | curly | GOV.UK | GOV.UK | GOV.UK |
| UI elements | bold, or single quotes | bold, not quotes | GOV.UK | GOV.UK | GOV.UK | n/a | GOV.UK |
| Dashes | avoid, use "to" for ranges | en dash sparingly | GOV.UK | spaced dashes | GOV.UK | GOV.UK | GOV.UK |
| Statistics | % with numerals | prefer "1 in 7" over 14.3% | GOV.UK | % change as "from X% to Y%" | GOV.UK | GOV.UK | GOV.UK |
| Council | local council | n/a | GOV.UK | GOV.UK | GOV.UK | GOV.UK | local authority |
| Hint text | no full stop for fragments | n/a | full stops in hint text | GOV.UK | GOV.UK | n/a | GOV.UK |

---

# Reference: ui-content

Source: GOV.UK Design System (design-system.service.gov.uk) component and pattern guidance, plus GOV.UK style. Department design systems (MoJ, HMRC, DWP, Home Office) build on this.

### Page titles and questions

- One question per page where possible.
- Question pages: the H1 is the question, in sentence case, with a question mark. "What is your National Insurance number?" not "National Insurance number details".
- If the H1 is the question, the field label is the H1 (do not repeat it).
- Non-question pages: titles describe the task or outcome. "Check your answers before sending your application".
- Ask only what the service needs. Explain why if it is not obvious.

### Hint text

Use hints for: why you need it, where to find it, the format expected, what to include or leave out.

Do not use hints to repeat the label, hide essential information, or explain validation rules at length. Keep to one or two short sentences.

Example: "For example, 27 3 2007" (date input). "It's on your National Insurance card, payslip or P60. For example, 'QQ 12 34 56 C'."

### Answer options

- Mutually exclusive, in a logical order (alphabetical if no natural order).
- Same grammatical form, short, in the user's words.
- Only include "I do not know" or "Not sure" if the service can handle that answer.
- Radios with "Yes" and "No": label is the question, options are "Yes" and "No".

### Buttons and links

- Buttons describe the action, sentence case, no full stop: "Continue", "Save and continue", "Accept and send", "Start now", "Pay now".
- Not "Submit", "Click here", "OK".
- Start page button: "Start now". Back link: "Back".

### Error messages

Say what has gone wrong and how to fix it. Plain English, positive, to the point. Use the same words as the question or label.

- Empty field: instruction starting with a verb. "Enter your first name", "Select if you are employed", "Enter your date of birth".
- Constraint broken: description. "First name must be 35 characters or less", "Date of birth must be in the past", "Amount must be £10 or more".
- Format wrong: "Enter an email address in the correct format, like name@example.com". Do not give an example if one is already on the page.

Do not use: "error", "invalid", "valid", "forbidden", "illegal", "sorry", "please", "oops", "you forgot", "this field is required", "answer the question", technical codes.

Error summary heading: "There is a problem". The summary repeats each field error as a link to the field.

### Check your answers

- Heading: "Check your answers before sending your application" (or similar task-specific wording).
- Each row: short label, answer, "Change" link with hidden text naming the answer.
- Declaration section above the button if a legal declaration is needed: "Now send your application", then the declaration in plain English, then "Accept and send".

### Confirmation pages

- Panel heading states what happened: "Application complete", "Payment received", "Your details have been updated". Not "Success".
- Give the reference number in the panel if there is one.
- Then "What happens next": what you will do, how long it takes, how you will contact them, what they need to do, what to do if something changes.
- Distinguish received, checked, decided, paid and completed. Do not say "approved" if you have only received it.

### Warning and inset text

- Warning text: for consequences the user must know, such as legal penalties. Start with the consequence. "You can be fined up to £5,000 if you do not register."
- Inset text: for information that needs to stand out, used sparingly.

### Notification banners

- Success banner after an action: say what changed. "Training outcome recorded and trainee withdrawn".
- Important banner: for something the user must know before continuing. Keep it to one message.

### Service unavailable and timeout pages

- Say what has happened and what to do. "Sorry, the service is unavailable" is the GOV.UK pattern heading (the one place "sorry" is used). Give when it will be back and an alternative way to get help.
- Timeout warnings: say when they will be signed out and what happens to their answers, and give a clear way to stay signed in.

### Staff-facing (caseworker) services

Same plain English rules. Practitioners are busy and use the system all day, so:
- Use the terms staff actually use, but explain new or system-specific terms.
- Do not copy legacy system labels if they are unclear. Check the domain guide (for example MoJ replaces "caseload" with "change location").
- Dense data is fine in tables, but keep labels short and consistent.

---

# Reference: channels

Sources: NHS service manual "Writing NHS messages", GOV.UK Notify formatting and letter specification, GOV.UK style. These channel rules apply across all departments, not just health.

### All channels

- Start with the most important information: why you are contacting them and what they need to do.
- One main call to action per message.
- Say: what has happened, what they need to do, by when, what happens next, how to get help.
- Refer to something the reader expects (their appointment, their application, their licence) so they trust it is genuine.
- Tailor each channel. Do not paste the letter into a text message.
- Do not ask for personal information (date of birth, NHS number, National Insurance number, bank details) in the message itself.
- Never send people to an unmonitored inbox without saying so and giving an alternative.
- No bold, italics, underlining or mixed fonts (GOV.UK Notify).
- Bullet lists: lead-in with colon, lower case starts, no end punctuation.
- Numbered steps: capital letter start, full stop at the end.
- Headings in sentence case.

### Letters

- Greeting: "Dear [name]". Formality builds trust.
- Sender identified clearly in the header and signature (service or team name, not just "the department").
- First paragraph: why you are writing and what they need to do.
- Use headings for longer letters: "What you need to do", "What happens next", "If you need help", "If you disagree with this decision".
- Put the deadline as a date, not "within 14 days of the date of this letter". If a legal deadline must be stated as a period, give the period and the date it ends.
- Put reference numbers near the top, labelled: "Your reference: ABC12345".
- Explain how to challenge a decision where there is a right to do so.
- Offer alternative formats (large print, braille, audio, Easy Read, BSL, Welsh) where the organisation provides them.
- Sign-off: "Yours sincerely" when you have used their name. A named person or team, not "Customer Services".
- GOV.UK Notify letters: A4, 10 pages maximum (5 double-sided sheets). Notify letters support headings, bullets, numbered steps and page breaks, but not subheadings.
- Letters in Wales may need to be bilingual. See "Reference: welsh".

### Emails

- Subject line: short, specific, front-loaded. "Your GP appointment reminder", "Your licence application has been approved". Not "Important information" or "Update".
- Greeting: "Dear [name]", not "Hi" (NHS rule, also safer for government generally).
- Sender name and domain recognisable (for example @nhs.net, a gov.uk address).
- Headings, bullets and lists are fine.
- Link only to trusted sites (GOV.UK, NHS.UK, the service). Link text describes the destination.
- No attachments where avoidable.

### Text messages (SMS)

- 160 characters = 1 message fragment. Longer messages are charged as more fragments. Some characters count as 2 characters. Accented characters (including Welsh ŵ and ŷ) can change the encoding and cut the limit, so check GOV.UK Notify's text message pricing guidance before sending Welsh SMS.
- No formatting at all: no bullets, bold or headings. Use line breaks.
- Name the sender in the first words if the sender ID is not obvious.
- One action. Plain words, no abbreviations or acronyms, no text-speak.
- Links: full, human-readable URLs (for example www.gov.uk/check-state-pension). No URL shorteners, no personal data in links. Spelling or grammar errors make messages look like scams.
- Do not include sensitive information (diagnosis, offence, debt amount) unless the channel is approved for it.

Example (appointment reminder):
"NHS Ashworth Clinic: You have a blood test on Tuesday 6 October at 9:30am. To change it, call 0161 496 0000. Reply STOP to cancel."
(Check whether "Reply STOP" is supported by the service before using it.)

### NHS App and secure in-app messages

- Up to 5,000 characters, but many people only read the start. Front-load, use short paragraphs and bullets.
- "Dear [name]". First name for a conversational tone, full name for reassurance.
- Sender name is shown, so no signature needed.
- More secure than SMS or email because of NHS login, so can carry more detail, but still keep it brief.
- Text links, not full URLs.

### Sensitive and difficult messages

Applies to bereavement, debt, enforcement, recall, test results, refusals, sanctions.

- Lead with the fact, plainly. Do not bury it under reassurance.
- Then what it means for them, what they need to do, and what support is available.
- Calm and respectful. No threats, no capital letters, no bold warnings. State consequences as facts: "If you do not come to this appointment, we may take you back to court."
- Avoid "unfortunately" stacking and generic reassurance ("Do not worry"). Specific next steps reassure more.
- Offer a named way to talk to someone.

---

# Reference: nhs-health

Source: NHS digital service manual content guide (service-manual.nhs.uk/content) and its sub pages: how we write, voice and tone, health literacy, A to Z of NHS health writing, inclusive content, writing NHS messages, formatting, punctuation, numbers. Use for NHS services, patient letters, health information on GOV.UK, UKHSA and DHSC public content. Where this conflicts with GOV.UK core, this wins.

### Why it is stricter

More than 40% of UK adults struggle with everyday health information. More than 60% struggle when it includes numbers and statistics. Low health literacy leads to missed appointments, medicine errors and more A&E visits.

### Clarity and length

- Reading age 9 to 11. Accept 11 to 14 only for complex medical content.
- Sentences 20 words maximum. Paragraphs 3 sentences maximum.
- Use the same plain style for healthcare professionals.
- Plain term first, medical term in brackets: "piles (haemorrhoids)", "cervical screening (smear test)" at first mention. Include medical terms that people search for.
- Short words: "have" not "experience", "get" not "develop".
- Active voice.

### Accuracy

- Clinical content must be reviewed by a qualified clinician. Flag this under "Check before publishing" every time.
- Factual, neutral, no metaphors.
- Avoid subjective words (good, bad, easy) unless describing symptoms or backed by evidence.
- Precise measurements: "a 250ml glass" not "a large glass".
- Explain what "positive" and "negative" results mean. They confuse people.

### Voice and tone

- Neutral, factual, authoritative, approachable. Address the reader as "you".
- Reassure with balanced facts: "Sertraline can cause side effects, but many people have no side effects or only minor ones."
- Empower, do not order: "talk to a GP about...".
- Avoid "should". It can sound patronising. Use "you need to", "it's important to", or the imperative.
- Serious conditions and urgent advice: direct, serious, reassuring, imperative. "Call 999 if..."
- Lifestyle content: encouraging and conversational.
- Forms: conversational, like a dialogue, not an interrogation.

### Words (NHS A to Z)

| Use | Not |
|---|---|
| GP | doctor (unless a specialist or consultant might be meant) |
| a GP (urgent care), your GP (ongoing care) | |
| doctor, nurse or other healthcare professional | clinician |
| condition, problem, illness | disease, disorder |
| has diabetes, has epilepsy, people with diabetes | diabetic, epileptic, suffers from, afflicted by, victim of |
| get or have symptoms | develop, experience |
| feeling sick | nausea |
| being sick | vomiting |
| poo | stool, bowel movements |
| pee | urinate, pass urine, wee |
| bottom | anus, rectum (unless clinically needed) |
| tummy (children or informal) | (add "abdomen" in brackets if needed) |
| food pipe | gullet |
| kidney | renal (mention only if searched for) |
| pharmacy | chemist |
| high temperature | specific degrees (except babies under 6 months) |
| vaccine (the dose), vaccination (the process) | jab (add "sometimes called the flu jab" only if people search for it) |
| A&E | (no need to spell out, the only allowed ampersand) |
| long COVID | Long Covid |
| ethnic minorities | BAME, BME |
| Deaf (BSL users), deafness (symptom) | |
| straight away, now | immediately |
| happen | occur |
| usually, most people | normally (implies abnormal) |
| wheelchair user | confined to a wheelchair |
| mental health condition, mental health problem | mentally ill |
| disabled person, people living with a disability | handicapped |

No "eg", "ie", "etc". No "third party" unless research supports it.

### Numbers (differs from GOV.UK)

- Numerals for all numbers, including 1 and 2, and at the start of sentences, headings and lists.
- Avoid two numerals together: "one or two 200mg tablets", not "1 or 2 200mg tablets".
- No space between amount and unit: 250mg, 2,500kcal.
- Avoid decimals except money, medicine doses and medical measurements. Use a leading zero: 0.25.
- Ordinals as numerals with letters: 1st, 2nd (no superscript). But "first aid", "secondhand".
- Spell out common fractions: two-thirds.
- Prefer "1 in 7" or "half" to percentages. Do not mix formats in one piece.
- Metric, with imperial in brackets if it helps.
- Dates and times as GOV.UK: 6 August 2026, Wednesday 6 August 2026, 5:30pm, midday, midnight. Months in full. "to" for ranges.

### Punctuation and formatting (differs from GOV.UK)

- Positive contractions encouraged (you'll, we'll, what's). No negative contractions. "Don't" is allowed only as a heading in Do/Don't lists. No contractions in page titles or URLs.
- Quotation marks: straight double quotes for sources and unusual terms. Single quotes inside quotes and for headlines. Do not use quotes for UI elements, use bold.
- En dashes sparingly. Prefer commas, brackets or a new sentence.
- No full stops in headings, buttons, action links or one-sentence cards.
- Drug names: generic lower case (paracetamol), brand names capitalised.
- Conditions lower case except proper nouns (Alzheimer's disease, Down's syndrome).
- Lists: 6 items maximum where possible, items of similar length.
- No italics or underlining. Bold sparingly for UI elements only. Do not bold for emphasis. Use front-loading, headings or the word "important".
- Links: specific and descriptive. Add "(opens in new tab)" if it must open in a new tab. PDFs: add "(PDF only, [file size])" in brackets.
- Abbreviations: spell out at first use unless well known (NHS, GP, UK).
- Left-align English text. Never justify.

### Inclusive content

- Do not label people by their condition. Use positive language.
- Ask users how they want to be described and test it.
- Sex and gender: NHS has specific guidance in its inclusive content section. Check the current version for clinical content about sex-specific conditions or screening, as policy here has changed.

### Patient letters and messages

See "Reference: channels". In particular:
- Name the service and the familiar event (your appointment on..., your recent test).
- Appointment letters: what, when (day, date, time), where (full address, which entrance or department), what to bring, how to prepare, how to change or cancel, how to get there.
- Results letters: say plainly what the result is and what it means before anything else. Then what happens next and who to contact.
- Do not put diagnoses in SMS or email unless the channel is approved.

---

# Reference: justice

Sources: MOJ Design System content style guide (design-patterns.service.justice.gov.uk/content-standards/style-guide), MoJ design principles for services used by people in prison (2024), GOV.UK style. Use for HMPPS, prisons, probation, courts and tribunals, Youth Justice, Legal Aid, Office of the Public Guardian.

### Who you are writing for

#### People in prison
- Lower literacy and numeracy than the general population. Design and write simply by default so as many people as possible understand.
- Higher rates of neurodivergence, brain injury, mental health conditions and addiction.
- Many distrust official sources and worry about other people seeing their information.
- Write in a trauma-informed way: calm, clear, respectful, no shaming, no threats, no unnecessary detail about the offence.
- Aim for reading age 9 to 11. Short sentences, one action at a time.
- Do not assume internet access, a phone or a private place to read.

#### People on probation
- Same literacy and trauma considerations.
- Letters often carry legal weight (appointments, licence conditions, warnings, recall). Keep every legal requirement, condition and consequence. Make them clearer, not softer.
- State consequences as plain facts, once, near the action they relate to. Not in capitals or bold.
- Tell them who to contact and how if they cannot make an appointment, before the consequence.

#### Victims and families
- Lead with what has happened and what it means for them. Offer a named contact.
- Do not use "offender" when writing about the person to a victim either. Use their name or "the person who [harmed you / was convicted]" as appropriate, and check the service's own guidance.

#### Practitioners and staff
- Staff-facing services follow the same plain English rules, but use the terms practitioners use, with system names written correctly.

### Terms

| Use | Do not use |
|---|---|
| prisoner, person in prison, people in prison | offender, ex-offender, PIP |
| person on probation, people on probation | offender, POP |
| the person's name where possible | generic labels |
| probation practitioner | COM (where possible) |
| community probation practitioner | community offender manager |
| cell | (MoJ research found people in prison do not find "cell" stigmatising) |
| preferred name | working name (NOMIS term) |
| change location | caseload (legacy term) |
| reoffending predictors | risk predictors |
| licence (noun and verb) | license |
| risk of serious harm (ROSH) | RoSH |
| release on temporary licence (ROTL) | |
| fixed term recall (FTR48 for staff) | |

#### Release dates (name the specific type)
- Conditional Release Date (CRD)
- Sentence Expiry Date (SED)
- Licence Expiry Date (LED)

In public-facing content, explain what each date means in plain words at first use: "your licence ends on 6 October 2027 (your Licence Expiry Date)".

#### Acronyms
- All capitals, even for short words inside them: MOJ not MoJ, ROSH not RoSH.
- System names in their own mixed case: OASys, NDelius, NOMIS.
- Spell out at first use in guidance. In staff services you can leave out the expansion for terms every user knows.

### Times (differs from GOV.UK)

- Staff-facing services: 24-hour clock (14:00, not 2pm). Prisons and NDelius use it.
- Public-facing content (letters to people on probation, families, GOV.UK pages): 12-hour clock as GOV.UK (2pm, 9:30am) is usually clearer. Choose one and be consistent.

### Hint text (differs from GOV.UK)

Use full stops in hint text.

### Letters and messages to people on probation

Structure:
1. What this letter is about, in one sentence ("You need to come to an appointment with your probation practitioner.")
2. The action, date, time, place. Day, date and time on their own lines.
3. What to bring.
4. If you cannot come: who to contact, how, and by when.
5. What happens if you do not come (the legal consequence, stated once, plainly).
6. Help and support (including how to get the letter in another format or language).

Do:
- Keep the exact licence condition wording where it is legally required, then explain it in plain English underneath.
- Use "you must" only for legal requirements of the licence or order.
- Give dates as dates ("by Friday 9 October 2026"), not "within 7 days".

Do not:
- Use "breach", "enforcement", "non-compliance", "recall" without explaining them in plain words ("If you do not follow the conditions of your licence, you could be sent back to prison. This is called being recalled.").
- Use "failure to comply", "you are hereby", "it has been noted that".
- Threaten, moralise or describe the offence.

### Content for people in prison (kiosks, Content Hub, notices, in-cell devices)

- Very short. One topic per page or notice.
- Plain words for prison processes: say "apply" or "ask" rather than "submit an app" unless "app" is the term used in that prison, and explain it.
- Assume someone else might see the screen. Keep personal information off shared screens unless needed.
- Represent people with lived experience, not stereotypes.

---

# Reference: departments

Each department follows GOV.UK style and adds its own rules. Only the differences are listed here. If a department is not listed, use GOV.UK core.

### HMRC

Source: HMRC content style guide (design.tax.service.gov.uk/hmrc-content-style-guide).

- Capitalise a specific tax, duty or levy by its full name: Income Tax, Beer Duty, Stamp Duty Land Tax. Do not capitalise generic "tax", "duty", "levy", or groups like "excise duty", "alcohol duties", "tax credits".
- Initial capitals for these product names: Adoption Pay, Bereavement Allowance, Child Trust Fund, Gift Aid, Maternity Pay, Paternity Pay, National Minimum Wage, Personal Allowance, Private Residence Relief, Unique Taxpayer Reference, Making Tax Digital (no acronym in user guidance).
- "business" generically. "company" only for limited companies.
- "personal tax account", "business tax account" in lower case.
- "Government Gateway user ID", never "Government Gateway ID" or "HMRC online account".
- "fill in" a return or form, paper or online. Submit, send or file for sending it.
- Avoid "due" and "overdue". Say what needs paying and by when: "You need to pay £320 by 31 January 2027."
- "penalty" for consistency (every fine is a penalty but not every penalty is a fine).
- Percentage changes: "from 5% to 7%", not "an increase of 2%".
- EORI: "an EORI number starting with GB" (not "GB EORI").
- "we" for HMRC when it is clear.
- Curly (smart) apostrophes and quotation marks.
- Dashes always have spaces either side (but prefer rewriting without them).
- No exclamation marks.
- Link punctuation goes outside the link text.
- Tax years: "2026 to 2027 tax year". Self Assessment as GOV.UK core.

### DWP

Source: DWP Design System (design-system.dwp.gov.uk). DWP uses GOV.UK style plus DWP terms and patterns.

- Benefit names in title case: Universal Credit, Personal Independence Payment (PIP), Employment and Support Allowance (ESA), Jobseeker's Allowance (always with the apostrophe), Pension Credit, State Pension, Carer's Allowance, Attendance Allowance.
- Write about the person, not their category. Say "you" in letters and services.
- Offer alternative formats in letters and services (large print, braille, audio, BSL video relay, Easy Read) using the DWP "alternative formats" pattern wording where the service supports it.
- Many readers are under financial or health stress. Lead with the decision or amount, then what it means, then what they can do (including how to ask for the decision to be looked at again).
- Declarations: use the DWP "make a declaration" pattern. Keep the legal declaration text but put a plain English explanation above it.
- Check terms against the DWP Design System for the specific benefit before publishing. Flag any benefit-specific term you could not verify.

### Home Office

Source: Home Office content style guide (design.homeoffice.gov.uk/design-and-content/content/content-style-guide).

- Avoid all contractions, positive and negative. Many readers are not fluent in English.
- "people", not "persons" or "individuals".
- Avoid "migrants". Be specific: applicant, claimant, worker, employee, or "people".
- "asylum claimant" or "asylum applicant". Choose one per service and stick to it.
- "refugee" only for people granted refugee status.
- "settlement", not "indefinite leave to remain/enter" ("apply for UK settlement").
- "permission to stay", not "leave to remain". "permission to enter", not "leave to enter".
- Visa names: capitalise the name, lower case "visa": Skilled Worker visa, Standard Visitor visa. Say "visa", not "route".
- biometric residence permit (BRP): lower case, initials after first use.
- eVisa: explain at first use, for example "view and prove your online immigration status (eVisa)". "online immigration status", not "digital status".
- "fingerprints and photo (biometric information)".
- "create an account", not "register" or "set up". "sign in", not "log in".
- Name the role people meet: "Border Force officer" where that is who they will see.

### GOV.WALES (Welsh Government) in English

Source: GOV.WALES style guide (gov.wales/govwales-style-guide). Use for Welsh Government content and devolved services in Wales.

- "local authority", not "local council".
- Social model of disability: "disabled people", "non-disabled" (not able-bodied), "invisible impairment" (not hidden disability). Do not call disabled people "vulnerable".
- "additional learning needs" or "access requirements", not "special needs".
- "children looked after", not "looked-after children".
- "Member of the Senedd (MS)", not Assembly Member. "Senedd Cymru" or "Welsh Parliament".
- Compass points lower case: north Wales, south Wales. Regions lower case (western Europe), except Middle East, Central America, North America.
- "fine", not "financial penalty".
- Never use "&" in Welsh content. Data is plural in Welsh.
- Welsh language pages: add "Rydym yn croesawu galwadau yn Gymraeg" (no brackets) next to telephone numbers.

### Cabinet Office functional standards

See "Reference: functional-standards".

### DfE and education

No separate guide needed. GOV.UK A to Z covers education terms: lower case for key stage 4, year 1, early years, free school, academy (title case only in names), headteacher, special educational needs and disabilities (SEND), education, health and care (EHC) plan. National Curriculum tests, not SATs. Ofsted grades in lower case in single quotes.

### Defra and environment

No separate content style guide found. Use GOV.UK core. Name regulations in full at first use with title case for the full title, lower case for generic references ("the regulations"). Explain regulatory terms (producer, obligation, compliance scheme) in plain words at first use.

---

# Reference: functional-standards

Source: Cabinet Office, Functional Standards writing style guide (gov.uk/government/publications/handbook-for-standard-managers/functional-standards-writing-style-guide), September 2024. Use for government functional standards and similar documents that set mandatory requirements for organisations (standards, policies, codes of practice, assurance frameworks). Not for public-facing content.

### Approach

- Plain English, written for the reader. Plain English does not mean oversimplifying or changing the meaning.
- Short sentences, one idea per sentence. Leave out words you do not need. Use lists where you can. Phrase points positively where it makes sense.
- Take care with punctuation. It can change the meaning.
- Reduce jargon. Do not define words that have an obvious plain English meaning. Avoid acronyms.
- Present tense. Standards do not predict the future.
- Outcome based: say what is needed, not how to do it.
- Long shelf life: leave out things likely to change, such as job titles.
- Agnostic to proprietary products and methods unless government has adopted them.
- Number every clause so it can be referred to.
- Notes and examples can give extra information. Never put a requirement, recommendation or permission in a note.
- Use the standard template. Use the functional standards common glossary for defined terms, the Shorter Oxford English Dictionary for word meanings, and the GOV.UK style guide.

### Accountabilities

Every accountability states who the role is accountable to and what for: "The project manager is accountable to the senior responsible owner for the day to day management of a project." Roles may not be shared.

### Modal verbs (overrides GOV.UK)

| Word | Meaning | Rule |
|---|---|---|
| shall | requirement: no deviation permitted if compliance is claimed | Do not use "must" instead. Use "shall not" for prohibitions, never "may not". |
| should | recommendation | Met on a comply or explain basis. |
| may | permission | Do not use "possible" or "impossible" for this. |
| might | possibility | Informative text only. |
| can | possibility or capability | Informative text only. |
| will | | Ambiguous. Do not use. |
| must | | Do not use, except in a legal context. |
| is / are | description | |

When rewriting into a standard, convert every obligation into shall, should or may, and flag any sentence where it is unclear which one the author meant. That choice changes compliance, so never guess silently.

---

# Reference: welsh

Sources: Welsh Government Translation Service style guide (Yr Arddulliadur, on BydTermCymru, gov.wales/bydtermcymru/style-guide), GOV.WALES style guide, Welsh Language Commissioner guidance on bilingual drafting and translation, and on bilingual design, GOV.UK guidance on translations.

### Ground rules

- Produce Welsh from the finished English rewrite, not the original.
- Welsh must be of the same quality and completeness as the English. Never summarise or shorten the Welsh. The Welsh language must not be treated less favourably than English.
- The Welsh Language Commissioner says machine output cannot replace a professional translator, because a machine cannot understand context. Always end with: "This Welsh version needs checking by a qualified Welsh translator before publication."
- Check terminology against TermCymru (the Welsh Government's term bank) if you can access it. List any official or legal terms you could not verify under "Check before publishing".
- Keep official names in their official Welsh form: Llywodraeth Cymru (Welsh Government), Senedd Cymru, GOV.UK (unchanged). Use the organisation's own Welsh name if it has one. If it has no Welsh name, keep the English and flag it.
- Do not create Welsh acronyms for organisations that do not use them. Give the full name first, then the acronym in brackets.

### Register

The Arddulliadur defines four registers:

- Clasurol (classical): "Yr wyf". Formal ceremonial texts only.
- Ffurfiol (formal): most government work. "Rwyf yn". Avoid affirmative particles such as "fe" and "mi".
- Anffurfiol (informal): press releases, campaigns. "Rydw i'n". Particles allowed.
- Llafar (spoken): scripts. Colloquial forms and elisions allowed.

Defaults:
- Services, letters, guidance: formal (ffurfiol), but written in Cymraeg Clir.
- Campaigns, social media, friendly service messages: informal (anffurfiol).
- Address the reader as "chi" (eich, chi, eich hun) by default. Use "ti" only if the user asks for it, for example a campaign for children or young people.

### Cymraeg Clir (clear Welsh)

The Welsh equivalent of plain English:

1. Be short and concise (bod yn fyr ac yn gryno).
2. Avoid feminine and plural forms of adjectives unless they are in common use.
3. Use simple words and constructions.
4. Use active sentences, not passive ones.
5. Use fewer impersonal verb forms (cynhelir, gwneir). Prefer personal forms: "Byddwn ni'n..." rather than "Fe wneir...".
6. Split sentences with several clauses into shorter ones.
7. Use verb-nouns (berfenwau) instead of noun and adjective combinations where you can.
8. Do not follow English sentence structure too closely. Write natural Welsh, not translated English.

### Grammar points that often go wrong

- a / ac: aspirate mutation after "a": a chyda, a chan, a thros (not "a gyda"). Never use "&" in Welsh.
- â / ag: after certain verbs (cwrdd â, cydweithio â, not "cydweithio gyda"), for possession (y ferch â'r ffrog werdd) and comparisons (cyn gryfed ag arth).
- Mutations: eich does not cause a mutation, but check soft mutation triggers carefully (for example after "efallai": efallai fod).
- Noun gender: use the first gender given in Geiriadur Prifysgol Cymru.
- Prepositions: choose carefully. Many errors come from translating English prepositions directly.
- Phrasal verbs: translate the meaning, not word for word.
- Verb tense: past simple (Dywedodd) and perfect (Mae wedi dweud) are not interchangeable.
- Always include accents and circumflexes (â, ê, î, ô, û, ŵ, ŷ). Leaving them out is a spelling mistake and can change the meaning.
- Use gender-neutral wording where the English is neutral and Welsh allows it.

### Punctuation and formatting

- Open punctuation: as little punctuation as possible.
- No full stops in abbreviations: ee (for example), hy (that is). But follow GOV.UK and prefer writing them out ("er enghraifft") in user content.
- No semicolons in bullet lists.
- One space after punctuation.
- Data is plural in Welsh.
- Compass points lower case unless part of a name: gogledd Cymru, but Gogledd Iwerddon.

### Dates and times

- Dates: 1 Ionawr 2026. Not "1af Ionawr" or "Ionawr 1, 2026".
- With a day, no capital and no "ar" for a specific date: ddydd Llun, 15 Hydref. Use "ar ddydd Gwener" only for a general or repeated day ("every Friday").
- Months: Ionawr, Chwefror, Mawrth, Ebrill, Mai, Mehefin, Gorffennaf, Awst, Medi, Hydref, Tachwedd, Rhagfyr.
- Days: dydd Llun, dydd Mawrth, dydd Mercher, dydd Iau, dydd Gwener, dydd Sadwrn, dydd Sul.
- Use "mis" when referring to a month in general: "tua diwedd mis Hydref".
- Years in full: yn 2026, not yn '26. For 1000 to 1999 write "yn 1999" (not "ym 1999").
- Decades: y 1960au (not y 60au or y chwedegau). Centuries in words: yr unfed ganrif ar hugain.
- Times: 10am hyd 4pm. Not "10 am hyd 4 pm" or "10yb hyd 4yh". Note "hyd" for time ranges.

### Letters

- Greeting: "Annwyl [enw]".
- Sign-off: "Yn gywir" (equivalent of Yours sincerely).
- Telephone numbers on Welsh pages and letters: add "Rydym yn croesawu galwadau yn Gymraeg".

### Bilingual layout

- Online: separate Welsh and English pages with a language toggle (ideally top right). Never put both languages on the same web page (it breaks screen readers). GOV.UK guidance says the same.
- Print: equal legibility and prominence. Options are parallel columns, parallel pages, back-to-back (good for letters), or tilt and turn. Avoid top-and-bottom, because the top language looks more important.
- Do not use a different font for each language. Use colour or a tint behind one language if you need to tell them apart, not coloured body text.
- Forms filled in by hand: both languages on the same side.
- Welsh Language Standards may require Welsh to come first. Check the organisation's Welsh language scheme or standards.
- Text messages: accented Welsh characters can change the SMS encoding and length. Check before sending.

### Common service phrases

Only use these if you are confident they match the GOV.UK Frontend Welsh translations for the component. Otherwise flag them.

- Back: Yn ôl
- Continue: Parhau
- There is a problem: Mae problem wedi codi
- Dear: Annwyl
- Yours sincerely: Yn gywir