// SM.maps.cx. Edited in the map editor; written back here as a snapshot.
window.SM = window.SM || { maps: {} };
SM.maps.cx = {
  "id": "cx",
  "tab": "CX",
  "title": "Drive with a medical condition",
  "subtitle": "Drivers Medical: target state, customer experience",
  "note": "Working draft. High-level, whole-service view. Channels and sequencing still to be tested.",
  "panels": [],
  "roles": [
    {
      "id": "customer",
      "label": "Customer does it",
      "colour": "#1d3d6b"
    },
    {
      "id": "agent",
      "label": "With an agent",
      "colour": "#00703c"
    },
    {
      "id": "dvla",
      "label": "DVLA contacts you",
      "colour": "#4c2c92"
    },
    {
      "id": "third-party",
      "label": "Third party",
      "colour": "#f4d7e3"
    }
  ],
  "rows": {
    "stage": [
      "Stage",
      "Customer action",
      "Service provision"
    ],
    "outcome": "Service outcomes",
    "measures": "Measures",
    "channels": "Channels and services",
    "objective": "Customer objective",
    "steps": "Steps",
    "tasks": "Epics",
    "footer": "Behind the scenes"
  },
  "phases": [
    {
      "id": "cx-p01",
      "number": null,
      "name": "Find out",
      "sub": "Inform",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "People with a medical condition know whether they need to tell DVLA, how to do it, and whether they can keep driving meanwhile.",
      "measures": "Unnecessary notifications · Late declarations",
      "footer": "Guidance written with DM policy, so what customers read matches how cases are decided.",
      "steps": [
        {
          "id": "cx-01",
          "channels": [
            "govuk"
          ],
          "quote": "I need to know if my condition affects my licence.",
          "title": "Check if you need to tell DVLA",
          "tasks": [
            {
              "id": "cx-t001",
              "title": "Check your condition",
              "description": "Look up the condition on GOV.UK and see whether it must be declared.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t002",
              "title": "Get advice from your doctor",
              "description": "GP, consultant or optician advises whether to tell DVLA.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-01"
        },
        {
          "id": "cx-02",
          "channels": [
            "govuk"
          ],
          "quote": "I want to know what will happen and how long it takes.",
          "title": "Understand what happens next",
          "tasks": [
            {
              "id": "cx-t003",
              "title": "See the process",
              "description": "What DVLA will ask for, typical timescales, and how you will be kept informed.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t004",
              "title": "Check if you can keep driving",
              "description": "Understand when you can drive while DVLA decides.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-02"
        }
      ]
    },
    {
      "id": "cx-p02",
      "number": null,
      "name": "Tell us",
      "sub": "Notify",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "People tell DVLA once, in the channel that suits them, and their case goes straight to the right route.",
      "measures": "Complete first time · Routed right first time · Paper keyed by hand",
      "footer": "Every channel lands in one intake, paper included. Case classified by risk archetype and routed to a pathway.",
      "steps": [
        {
          "id": "cx-03",
          "channels": [
            "govuk",
            "dmsp"
          ],
          "quote": "I want to tell DVLA online and get it done.",
          "title": "Tell DVLA online",
          "tasks": [
            {
              "id": "cx-t005",
              "title": "Prove who you are",
              "description": "Sign in with GOV.UK One Login. If it fails, get help without starting again.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t006",
              "title": "Tell us about all your conditions",
              "description": "Report every condition in one journey, rather than one notification each.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t007",
              "title": "Complete the notification",
              "description": "D1 and medical questionnaire, or D1 only.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-03"
        },
        {
          "id": "cx-04",
          "channels": [
            "phone",
            "webchat"
          ],
          "quote": "I'd rather tell someone and have them help me.",
          "title": "Tell DVLA with help",
          "tasks": [
            {
              "id": "cx-t008",
              "title": "Notify by phone",
              "description": "The IVR routes the call to an agent who completes the notification with you.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t009",
              "title": "Notify by webchat",
              "description": "An agent completes the notification over webchat.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t010",
              "title": "Notify by post",
              "description": "Send a paper D1. Paper forms ask what DMSP asks, including your licence number.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-04"
        },
        {
          "id": "cx-05",
          "channels": [
            "govuk",
            "phone",
            "webchat"
          ],
          "quote": "I'm telling you on behalf of someone else.",
          "title": "Notify for someone else",
          "tasks": [
            {
              "id": "cx-t011",
              "title": "Representative notifies",
              "description": "A family member or carer with authority to act notifies for the driver. Consent and account access still to be worked out.",
              "role": "customer",
              "unresolved": true,
              "components": []
            },
            {
              "id": "cx-t012",
              "title": "Third party notifies",
              "description": "A doctor or the police tell DVLA about a driver.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-05"
        },
        {
          "id": "cx-06",
          "channels": [
            "govuk-notify"
          ],
          "quote": "I want to know you've got it.",
          "title": "Get confirmation",
          "tasks": [
            {
              "id": "cx-t013",
              "title": "Case received",
              "description": "SMS, email or letter confirms the case has arrived, paper included, and what happens next.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t014",
              "title": "When to expect an update",
              "description": "When we will usually be in touch for cases like yours, and why.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-06"
        }
      ]
    },
    {
      "id": "cx-p03",
      "number": null,
      "name": "Stay informed",
      "sub": "Update",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "Customers always know where their case is, what happens next, and whether they can drive.",
      "measures": "Progress-chasing calls · Repeat calls",
      "footer": "Status changes in Dynamics trigger messages automatically.",
      "steps": [
        {
          "id": "cx-07",
          "channels": [
            "govuk-notify"
          ],
          "quote": "I want to hear from you when something changes.",
          "title": "Get told when your case moves",
          "tasks": [
            {
              "id": "cx-t015",
              "title": "Case in progress",
              "description": "Someone is working on your case.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t016",
              "title": "Waiting on someone else",
              "description": "Who we have asked for evidence, and when.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t017",
              "title": "Information received",
              "description": "The evidence or result has arrived and your case is moving again.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-07"
        },
        {
          "id": "cx-08",
          "channels": [
            "govuk-notify"
          ],
          "quote": "Tell me straight away if you need something from me.",
          "title": "Get told when you need to act",
          "tasks": [
            {
              "id": "cx-t018",
              "title": "Action required",
              "description": "What we need, why, how to send it, and by when.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-08"
        },
        {
          "id": "cx-09",
          "channels": [
            "customer-account",
            "dmsp"
          ],
          "quote": "I need to know if I can drive right now.",
          "title": "See your case",
          "tasks": [
            {
              "id": "cx-t019",
              "title": "Check status",
              "description": "Current stage, next step and expected timescale.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t020",
              "title": "See what's outstanding",
              "description": "Actions, evidence or consent still needed.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t021",
              "title": "See your appointments",
              "description": "Appointment details, reminders and any changes.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t022",
              "title": "Check if you can drive",
              "description": "A plain answer to whether you can drive today.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-09"
        }
      ]
    },
    {
      "id": "cx-p04",
      "number": null,
      "name": "Provide what's needed",
      "sub": "Gather evidence",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "DVLA gets the evidence it needs to decide, asked for once, and only when it will change the decision.",
      "measures": "Evidence requests per case · Days waiting on third parties",
      "footer": "Evidence requested only where it changes the decision. Third parties chased when it is late.",
      "steps": [
        {
          "id": "cx-10",
          "channels": [
            "phone",
            "webchat",
            "govuk-notify"
          ],
          "quote": "Tell me exactly what you need and I'll send it.",
          "title": "Get a request",
          "tasks": [
            {
              "id": "cx-t023",
              "title": "Written request",
              "description": "SMS, email or letter, each with a choice of how to respond.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t024",
              "title": "Call from an agent",
              "description": "An agent calls to ask for what is needed. Identity checked over the phone.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-10"
        },
        {
          "id": "cx-11",
          "channels": [
            "dmsp",
            "phone",
            "webchat"
          ],
          "quote": "I want to send it the easiest way for me.",
          "title": "Send what's asked for",
          "tasks": [
            {
              "id": "cx-t025",
              "title": "Upload evidence",
              "description": "Send letters, results or reports through DMSP, in the format you have them.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t026",
              "title": "Complete a medical questionnaire",
              "description": "Online or on paper. Both ask the same questions.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t027",
              "title": "Complete the D202 or D203",
              "description": "Online or by post. The paper route stays.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t028",
              "title": "Give consent",
              "description": "Online or on paper, without the paper form changing what you agree to.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t029",
              "title": "Give it to an agent",
              "description": "Information, evidence or consent by phone or webchat.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-11"
        },
        {
          "id": "cx-12",
          "channels": [
            "opticians",
            "examiners"
          ],
          "quote": "I need to go to an appointment.",
          "title": "Attend an appointment (tbc)",
          "tasks": [
            {
              "id": "cx-t030",
              "title": "Book an appointment",
              "description": "Book an eyesight test or medical examination with an approved supplier or doctor near you.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t031",
              "title": "Attend an examination or test",
              "description": "Go to the appointment. The result goes straight to DVLA.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-12"
        },
        {
          "id": "cx-13",
          "channels": [
            "gps",
            "consultants"
          ],
          "quote": "I need to know what DVLA wants and send it quickly.",
          "title": "Clinician provides evidence",
          "tasks": [
            {
              "id": "cx-t032",
              "title": "Receive a request",
              "description": "A clear, specific request in the clinician's preferred channel.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t033",
              "title": "Respond online",
              "description": "Complete the report online, D4 and VOC45 included, matched to the case. Chased if it does not arrive.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t034",
              "title": "Share patient records",
              "description": "With the customer's consent, relevant records shared directly rather than summarised by hand.",
              "role": "third-party",
              "unresolved": true,
              "components": []
            }
          ],
          "image": "cx-13"
        }
      ]
    },
    {
      "id": "cx-p05",
      "number": null,
      "name": "Get help",
      "sub": "Support",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "When customers get in touch, they reach someone who knows their case and can resolve it.",
      "measures": "Resolved first time · Calls reaching the owning team",
      "footer": "Calls and chats arrive with the case already on screen.",
      "steps": [
        {
          "id": "cx-14",
          "channels": [
            "phone",
            "webchat"
          ],
          "quote": "When I call, I want to speak to someone who knows my case.",
          "title": "Get in touch",
          "tasks": [
            {
              "id": "cx-t035",
              "title": "Phone",
              "description": "The IVR recognises your case, so you don't have to explain it again.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t036",
              "title": "Webchat",
              "description": "Chat with someone who can see your case.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-14"
        },
        {
          "id": "cx-15",
          "channels": [
            "phone",
            "webchat"
          ],
          "quote": "If nobody's free, I want you to call me back.",
          "title": "Get a call back",
          "tasks": [
            {
              "id": "cx-t037",
              "title": "Request a call back",
              "description": "Choose a time, in hours.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t038",
              "title": "Out of hours",
              "description": "Triage, then leave a message or book a call back.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-15"
        }
      ]
    },
    {
      "id": "cx-p06",
      "number": null,
      "name": "Get a decision",
      "sub": "Decide",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "People safe to drive keep driving. People who aren't stop, and understand why.",
      "measures": "Average days to decision · Decision quality",
      "footer": "Decisions supported by risk and operational insight.",
      "steps": [
        {
          "id": "cx-16",
          "channels": [
            "dvla",
            "govuk-notify"
          ],
          "quote": "I need a clear decision.",
          "title": "Receive a decision",
          "tasks": [
            {
              "id": "cx-t039",
              "title": "Licence issued",
              "description": "Full licence issued.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t040",
              "title": "Short-term licence issued",
              "description": "With the review date and what will be asked for next time.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t041",
              "title": "Licence kept",
              "description": "Renewal confirmed, no change.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t042",
              "title": "Licence refused or revoked",
              "description": "With the reasons and what you can do next.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-16"
        },
        {
          "id": "cx-17",
          "channels": [
            "dvla"
          ],
          "quote": "I want to understand how the decision was made.",
          "title": "Understand the decision",
          "tasks": [
            {
              "id": "cx-t043",
              "title": "See the reasons",
              "description": "What evidence was used and why.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t044",
              "title": "Case closed",
              "description": "Confirmation nothing more is needed.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-17"
        },
        {
          "id": "cx-18",
          "channels": [
            "govuk"
          ],
          "quote": "I need to stop driving.",
          "title": "Surrender your licence",
          "tasks": [
            {
              "id": "cx-t045",
              "title": "Surrender voluntarily",
              "description": "Online or by post. Know how to get your licence back later.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-18"
        }
      ]
    },
    {
      "id": "cx-p07",
      "number": null,
      "name": "Challenge",
      "sub": "Reconsider",
      "owner": null,
      "unresolved": false,
      "muted": false,
      "outcome": "People who disagree can have a decision looked at again, quickly and fairly.",
      "measures": "Challenges and appeals · Appeals won",
      "footer": "",
      "steps": [
        {
          "id": "cx-19",
          "channels": [
            "dvla"
          ],
          "quote": "I think the decision is wrong.",
          "title": "Challenge the decision",
          "tasks": [
            {
              "id": "cx-t046",
              "title": "Ask DVLA to reconsider",
              "description": "Explain why the decision should change.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t047",
              "title": "Send further evidence",
              "description": "New evidence reopens the case.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-19"
        },
        {
          "id": "cx-20",
          "channels": [
            "courts"
          ],
          "quote": "I want an independent decision.",
          "title": "Appeal",
          "tasks": [
            {
              "id": "cx-t048",
              "title": "Appeal to court",
              "description": "Magistrates' court in England and Wales, sheriff court in Scotland.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-20"
        }
      ]
    },
    {
      "id": "cx-p08",
      "number": null,
      "name": "Renew",
      "sub": "Review",
      "owner": null,
      "unresolved": true,
      "muted": false,
      "outcome": "People on a medical licence renew with effort proportionate to their risk.",
      "measures": "Effort per renewal · Renewals without a gap",
      "footer": "Renewal route set by risk archetype.",
      "steps": [
        {
          "id": "cx-21",
          "channels": [
            "govuk-notify"
          ],
          "quote": "Remind me before my licence runs out.",
          "title": "Get a renewal reminder",
          "tasks": [
            {
              "id": "cx-t049",
              "title": "Reminder",
              "description": "Sent in time to renew without a gap.",
              "role": "dvla",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-21"
        },
        {
          "id": "cx-22",
          "channels": [
            "dmsp",
            "phone",
            "webchat"
          ],
          "quote": "I don't want to start from scratch every time.",
          "title": "Renew",
          "tasks": [
            {
              "id": "cx-t050",
              "title": "Confirm nothing has changed",
              "description": "For stable conditions, renew by telling us nothing has changed. Depends on policy.",
              "role": "customer",
              "unresolved": true,
              "components": []
            },
            {
              "id": "cx-t051",
              "title": "Renew your way",
              "description": "Online, by post or with an agent, starting from what we already know rather than from scratch.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t052",
              "title": "New medical evidence",
              "description": "Only when the route requires it.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-22"
        }
      ]
    },
    {
      "id": "cx-p09",
      "number": null,
      "name": "Tell us about a change",
      "sub": "Reassess",
      "owner": null,
      "unresolved": true,
      "muted": false,
      "outcome": "Changes in health reach DVLA and trigger the right level of review.",
      "measures": "Changes reported before review",
      "footer": "A change re-triggers routing.",
      "steps": [
        {
          "id": "cx-23",
          "channels": [
            "dmsp",
            "phone",
            "webchat"
          ],
          "quote": "My health has changed and I need to tell you.",
          "title": "Report a change",
          "tasks": [
            {
              "id": "cx-t053",
              "title": "New condition",
              "description": "Added to what we already know, not started from scratch.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t054",
              "title": "Condition has changed",
              "description": "Tell DVLA it has got better or worse.",
              "role": "customer",
              "unresolved": false,
              "components": []
            },
            {
              "id": "cx-t055",
              "title": "Pause or resume your licence",
              "description": "Stop driving for a while, then resume on self-declaration where policy allows.",
              "role": "customer",
              "unresolved": true,
              "components": []
            }
          ],
          "image": "cx-23"
        }
      ]
    },
    {
      "id": "cx-p10",
      "number": "∞",
      "name": "Whole service",
      "sub": "Assist",
      "owner": null,
      "unresolved": true,
      "muted": false,
      "outcome": "Anyone using the service can get help or complain, whatever stage they are at.",
      "measures": "Complaints · Customer satisfaction",
      "footer": "",
      "steps": [
        {
          "id": "cx-24",
          "channels": [
            "dvla"
          ],
          "quote": "I'm unhappy with how I've been treated.",
          "title": "Make a complaint",
          "tasks": [
            {
              "id": "cx-t056",
              "title": "Complain",
              "description": "Through the DVLA complaints process.",
              "role": "customer",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "cx-24"
        }
      ]
    }
  ],
  "order": 1
};
