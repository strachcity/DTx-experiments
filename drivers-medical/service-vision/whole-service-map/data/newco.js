// SM.maps.newco. Edited in the map editor; written back here as a snapshot.
window.SM = window.SM || { maps: {} };
SM.maps.newco = {
  "id": "newco",
  "tab": "NewCo",
  "title": "Drive with a medical condition",
  "subtitle": "Drivers Medical: target state, NewCo operations",
  "note": "Working draft. High-level view of how the future operation runs. Who makes the decision is still to be agreed.",
  "panels": [
    {
      "heading": "Across every stage",
      "tone": "principle",
      "items": [
        {
          "lead": "Decision quality must not fall.",
          "text": "Every hypothesis could be met by a faster service making worse licensing decisions."
        },
        {
          "lead": "",
          "text": "We want to improve CSAT, quality, and the effectiveness and happiness of staff."
        }
      ]
    },
    {
      "heading": "Hypotheses the tasks test",
      "tone": "plain",
      "items": [
        {
          "lead": "Universal role:",
          "text": "casework and customer contact become one job."
        },
        {
          "lead": "EOC support model:",
          "text": "EOC supports in real time rather than as an escalation route."
        },
        {
          "lead": "Ownership of a customer group:",
          "text": "one team owns a group of customers, not just a case."
        },
        {
          "lead": "Measures built around customers:",
          "text": "KPIs shift from individual throughput to team customer outcomes."
        },
        {
          "lead": "Proactive engagement:",
          "text": "agents contact customers before they chase, and use every call."
        },
        {
          "lead": "Communications and guidance:",
          "text": "clearer guidance, transparency and reasons build trust."
        }
      ]
    }
  ],
  "roles": [
    {
      "id": "agent",
      "label": "NewCo agent (universal role)",
      "colour": "#00703c"
    },
    {
      "id": "clinician",
      "label": "Clinician or EOC",
      "colour": "#4c2c92"
    },
    {
      "id": "system",
      "label": "System, automated",
      "colour": "#1d3d6b"
    },
    {
      "id": "dmi",
      "label": "DMI (paper and scanning)",
      "colour": "#7a4b00"
    },
    {
      "id": "third-party",
      "label": "Third party",
      "colour": "#f4d7e3"
    },
    {
      "id": "upstream",
      "label": "Upstream, outside NewCo",
      "colour": "#6f777b"
    }
  ],
  "rows": {
    "stage": [
      "Stage",
      "Ops stage",
      "Who owns it"
    ],
    "outcome": "Operational outcomes",
    "channels": "Teams and systems",
    "objective": "Ops objective",
    "steps": "Steps",
    "tasks": "Epics",
    "footer": "Measured by",
    "measures": null
  },
  "phases": [
    {
      "id": "newco-p01",
      "number": null,
      "name": "Data modelling",
      "sub": "Against medical and road safety",
      "owner": "upstream",
      "unresolved": false,
      "muted": true,
      "outcome": "Medical risk is understood well enough to set the right route and evidence for every condition.",
      "measures": "",
      "footer": "Outside NewCo.",
      "steps": [
        {
          "id": "newco-01",
          "channels": [
            "prana"
          ],
          "quote": "I need to know how much this condition affects road safety.",
          "title": "Model risk",
          "tasks": [
            {
              "id": "newco-t001",
              "title": "Score risk by condition",
              "description": "PRANA models medical risk against road-safety evidence.",
              "role": "upstream",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t002",
              "title": "Set risk archetypes",
              "description": "Archetypes decide the route a case takes and the evidence it needs.",
              "role": "upstream",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-01"
        },
        {
          "id": "newco-02",
          "channels": [
            "dm-policy"
          ],
          "quote": "I need a rule that can be applied without a judgement every time.",
          "title": "Set policy",
          "tasks": [
            {
              "id": "newco-t003",
              "title": "Renewals for stable conditions",
              "description": "Keya policy paper: renewal as a process, not a decision, where risk allows.",
              "role": "upstream",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-02"
        }
      ]
    },
    {
      "id": "newco-p02",
      "number": null,
      "name": "Awareness and engagement",
      "sub": "Before anyone contacts us",
      "owner": "upstream",
      "unresolved": false,
      "muted": true,
      "outcome": "Customers know when and why to engage, and what to expect, before they need us.",
      "measures": "",
      "footer": "Failure demand. Customer confidence in the service.",
      "steps": [
        {
          "id": "newco-03",
          "channels": [
            "govuk"
          ],
          "quote": "Customers should know what we need before we ask for it.",
          "title": "Set expectations",
          "tasks": [
            {
              "id": "newco-t004",
              "title": "Guidance on the process",
              "description": "What happens, the part customers and third parties play, and how long it takes.",
              "role": "upstream",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t005",
              "title": "What you'll be asked for",
              "description": "Evidence, appointments and consent, explained before anyone notifies.",
              "role": "upstream",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-03"
        },
        {
          "id": "newco-04",
          "channels": [
            "customer-groups",
            "clinicians"
          ],
          "quote": "People should know to come to us, and when.",
          "title": "Build awareness",
          "tasks": [
            {
              "id": "newco-t006",
              "title": "Reach DM customer groups",
              "description": "Awareness built into the groups most likely to need the service.",
              "role": "upstream",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t007",
              "title": "Clinicians tell patients",
              "description": "Doctors and opticians explain when and how to tell DVLA.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-04"
        }
      ]
    },
    {
      "id": "newco-p03",
      "number": null,
      "name": "First contact or renewal",
      "sub": "NewCo",
      "owner": "agent",
      "unresolved": false,
      "muted": false,
      "outcome": "Every way in lands with the team that owns the customer, first time.",
      "measures": "",
      "footer": "Touchpoints.",
      "steps": [
        {
          "id": "newco-05",
          "channels": [
            "dmsp",
            "phone",
            "webchat",
            "post"
          ],
          "quote": "I want every case to land with the team that knows the customer.",
          "title": "Customer notifies or renews",
          "tasks": [
            {
              "id": "newco-t008",
              "title": "Online",
              "description": "A DMSP notification or renewal lands in the queue of the team that owns the customer.",
              "role": "system",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t009",
              "title": "Phone or webchat",
              "description": "An agent completes the notification and stays with the case.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t010",
              "title": "Post",
              "description": "A paper D1 or renewal goes to DMI.",
              "role": "dmi",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-05"
        },
        {
          "id": "newco-06",
          "channels": [
            "dynamics"
          ],
          "quote": "I want to know straight away who this is about.",
          "title": "Third party notifies",
          "tasks": [
            {
              "id": "newco-t011",
              "title": "Doctor, police or DVSA notifies",
              "description": "A third party tells DVLA about a driver.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t012",
              "title": "Link it to the customer",
              "description": "The agent matches it to the customer and their team.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-06"
        },
        {
          "id": "newco-07",
          "channels": [
            "govuk-notify",
            "phone"
          ],
          "quote": "I want to get in touch before they have to chase us.",
          "title": "We reach out",
          "tasks": [
            {
              "id": "newco-t013",
              "title": "Renewal due",
              "description": "A prompt goes out in time to renew without a gap.",
              "role": "system",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t014",
              "title": "Outbound contact",
              "description": "The owning agent contacts the customer when a case needs something.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-07"
        }
      ]
    },
    {
      "id": "newco-p04",
      "number": null,
      "name": "Processing",
      "sub": "NewCo",
      "owner": "agent",
      "unresolved": false,
      "muted": false,
      "outcome": "Cases are ready to work the day they arrive, without waiting in a queue.",
      "measures": "",
      "footer": "Average days to decision. Cost per transaction.",
      "steps": [
        {
          "id": "newco-08",
          "channels": [
            "dmi",
            "kerv-scanning"
          ],
          "quote": "I want paper on the case the day it arrives.",
          "title": "DMI",
          "tasks": [
            {
              "id": "newco-t015",
              "title": "Prepare and scan",
              "description": "Paper applications and documents prepared for scanning.",
              "role": "dmi",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t016",
              "title": "Key data",
              "description": "Data keyed into the system where scanning can't capture it.",
              "role": "dmi",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-08"
        },
        {
          "id": "newco-09",
          "channels": [
            "dynamics",
            "ai"
          ],
          "quote": "I want the case ready to work, not sat in a queue.",
          "title": "AI and tech",
          "tasks": [
            {
              "id": "newco-t017",
              "title": "Classify and route",
              "description": "Case classified by risk archetype and routed to the team that owns the customer.",
              "role": "system",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t018",
              "title": "Pull out what matters",
              "description": "AI reads forms and evidence and surfaces what the agent needs.",
              "role": "system",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t019",
              "title": "One view of the work",
              "description": "The team sees its own queue and its own customers in one place.",
              "role": "system",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-09"
        },
        {
          "id": "newco-10",
          "channels": [
            "payments"
          ],
          "quote": "I want healthcare professionals paid without paper in the post.",
          "title": "Payments",
          "tasks": [
            {
              "id": "newco-t020",
              "title": "Pay healthcare professionals",
              "description": "Digital invoicing replaces paper sent in the post.",
              "role": "system",
              "unresolved": true,
              "components": []
            }
          ],
          "image": "newco-10"
        }
      ]
    },
    {
      "id": "newco-p05",
      "number": null,
      "name": "Investigation",
      "sub": "NewCo",
      "owner": "agent",
      "unresolved": false,
      "muted": false,
      "outcome": "The right evidence arrives once, and the agent who owns the case can read it and act on it.",
      "measures": "",
      "footer": "Average days to decision. Touchpoints.",
      "steps": [
        {
          "id": "newco-11",
          "channels": [
            "dmsp",
            "post"
          ],
          "quote": "I only want to ask for what will change the decision.",
          "title": "Individual evidence",
          "tasks": [
            {
              "id": "newco-t021",
              "title": "Ask once",
              "description": "Request only what will change the decision, and say why.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t022",
              "title": "Match to the case",
              "description": "Evidence uploaded or posted is matched to the case.",
              "role": "system",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-11"
        },
        {
          "id": "newco-12",
          "channels": [
            "specsavers",
            "franchise-doctors"
          ],
          "quote": "I want the report back quickly, and to chase it if it's late.",
          "title": "Third-party engagement",
          "tasks": [
            {
              "id": "newco-t023",
              "title": "Specsavers vision test",
              "description": "Result returned, then interpreted.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t024",
              "title": "Doctor and consultant reports",
              "description": "From franchise doctors and consultants.",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t025",
              "title": "Driving assessment",
              "description": "No hypothesis yet",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t026",
              "title": "DVSA vision test and on-road assessment",
              "description": "No hypothesis yet",
              "role": "third-party",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t027",
              "title": "Chase",
              "description": "The owning agent chases when evidence is late.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-12"
        },
        {
          "id": "newco-13",
          "channels": [
            "dynamics",
            "eoc"
          ],
          "quote": "I need to understand the evidence, and get a second view fast.",
          "title": "Interpret the evidence",
          "tasks": [
            {
              "id": "newco-t028",
              "title": "Read the evidence",
              "description": "Agents have the access and understanding to interpret what has come back.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t029",
              "title": "Real-time support",
              "description": "EOC shares judgement in the moment, not as a formal escalation.",
              "role": "clinician",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-13"
        }
      ]
    },
    {
      "id": "newco-p06",
      "number": null,
      "name": "Decision",
      "sub": "NewCo",
      "owner": "agent",
      "unresolved": true,
      "muted": false,
      "outcome": "Decisions are timely, consistent and safe, whoever or whatever makes them.",
      "measures": "",
      "footer": "Average days to decision. Decision quality must not fall.",
      "steps": [
        {
          "id": "newco-14",
          "channels": [
            "dynamics",
            "eoc"
          ],
          "quote": "The decision has to be right, whoever or whatever makes it.",
          "title": "Decide",
          "tasks": [
            {
              "id": "newco-t030",
              "title": "Automated",
              "description": "Rules decide where it is a process, not a judgement.",
              "role": "system",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t031",
              "title": "AI-assisted",
              "description": "AI recommends, a person decides.",
              "role": "system",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t032",
              "title": "Human",
              "description": "The owning agent decides, with EOC where judgement is needed.",
              "role": "agent",
              "unresolved": true,
              "components": []
            }
          ],
          "image": "newco-14"
        },
        {
          "id": "newco-15",
          "channels": [
            "govuk-notify",
            "d90"
          ],
          "quote": "I want to explain the decision, not just send it.",
          "title": "Issue the decision",
          "tasks": [
            {
              "id": "newco-t033",
              "title": "Explain the decision",
              "description": "The owning agent issues it with the reasons, with more detail on revocation.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t034",
              "title": "Update the licence",
              "description": "Licence record updated and the licence sent.",
              "role": "system",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-15"
        }
      ]
    },
    {
      "id": "newco-p07",
      "number": null,
      "name": "Customer service",
      "sub": "NewCo",
      "owner": "agent",
      "unresolved": false,
      "muted": false,
      "outcome": "Reduction in appeals and complaints, and a 100% win rate against appeals.",
      "measures": "",
      "footer": "CSAT. Failure demand: progress-chasing and repeat calls. Appeals and complaints.",
      "steps": [
        {
          "id": "newco-16",
          "channels": [
            "govuk-notify",
            "phone",
            "customer-account"
          ],
          "quote": "I'd rather call them than wait for them to call us.",
          "title": "Proactive: outbound",
          "tasks": [
            {
              "id": "newco-t035",
              "title": "Automated updates",
              "description": "SMS at each status change.",
              "role": "system",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t036",
              "title": "Outbound calls",
              "description": "Agents call when a case needs something.",
              "role": "agent",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t037",
              "title": "Self-serve progress",
              "description": "Customers see real-time progress without calling.",
              "role": "system",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-16"
        },
        {
          "id": "newco-17",
          "channels": [
            "ivr-storm",
            "webchat"
          ],
          "quote": "When they call, I want to know who they are and move the case on.",
          "title": "Reactive: inbound",
          "tasks": [
            {
              "id": "newco-t038",
              "title": "Route to the owning team",
              "description": "The IVR recognises the customer and routes them to their team.",
              "role": "system",
              "unresolved": false,
              "components": []
            },
            {
              "id": "newco-t039",
              "title": "Move it on in the call",
              "description": "The agent treats the call as a chance to progress the case.",
              "role": "agent",
              "unresolved": false,
              "components": []
            }
          ],
          "image": "newco-17"
        },
        {
          "id": "newco-18",
          "channels": [
            "complaints",
            "courts"
          ],
          "quote": "Every decision should stand up if it's challenged.",
          "title": "Appeals and complaints",
          "tasks": [
            {
              "id": "newco-t040",
              "title": "Handle complaints",
              "description": "Handled by the team that owns the customer.",
              "role": "agent",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t041",
              "title": "Reconsider",
              "description": "Decision looked at again with any new evidence.",
              "role": "agent",
              "unresolved": true,
              "components": []
            },
            {
              "id": "newco-t042",
              "title": "Appeals",
              "description": "Magistrates' court or sheriff court. Aim to win every one.",
              "role": "third-party",
              "unresolved": true,
              "components": []
            }
          ],
          "image": "newco-18"
        }
      ]
    }
  ],
  "order": 2
};
