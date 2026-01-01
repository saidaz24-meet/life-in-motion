import type { ContentItem } from "../types";

export const ALL_ITEMS: ContentItem[] = [
        {
          "id": "roofmate",
          "type": "venture",
          "title": "RoofMate",
          "date": "jan 2024 - present",
          "tags": ["Bridge-building", "Entrepreneurship", "Community", "Leadership", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/roofmate/g10-expo-night.jpeg",
            "teaserVideo": "/teasers/roofmate-demo.mp4",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/roofmate/g1-my-mindset.jpeg",
              "/images/life/roofmate/g2-min-map-tools.jpeg",
              "/images/life/roofmate/g3-roofmate-book.JPG",
              "/images/life/roofmate/g4-brainstorming.png",
              "/images/life/roofmate/g5-beginning.jpeg",
              "/images/life/roofmate/g6-beginning.jpg",
              "/images/life/roofmate/g7-MVP-test-day.JPG",
              "/images/life/roofmate/g8-MVP-test-day.jpg",
              "/images/life/roofmate/g9-MVP-test-day.jpg",
              "/images/life/roofmate/g11-expo-night-Appsflyer.JPG",
              "/images/life/roofmate/g12-expo-night.JPG",
              "/images/life/roofmate/g13-expo-night.JPG",
              "/images/life/roofmate/g14-expo-night.JPG",
              "/images/life/roofmate/g15-expo-night.jpg",
              "/images/life/roofmate/g16-waitlist-website-screenshot.jpg"
            ]
          },
          "card": {
            "oneLiner": "Android-first roommate matching built to turn labels into roommates.",
            "headline": "Roommates, not headlines: trust at dorm scale",
            "subhead": "Built in MEET; engineered as a real product, not a slogan."
          },
          "beats": [
            "A nonprofit, Android-first matching platform.",
            "Built with a binational team through MEET.",
            "NLP ranks matches by interests and habits.",
            "Expo night: strangers thanked us like it mattered.",
            "Built to make “the other” feel like a roommate."
          ],
          "caseFile": {
            "context": "RoofMate is a nonprofit, Android-first roommate-matching platform built with a binational team during MEET. The idea is simple but demanding: reduce fear by replacing distance with everyday proximity—shared meals, late-night conversations, and study sessions—one roommate pair at a time. The platform focuses on matching by interests and habits (not nationality), using NLP to rank compatibility. I served as Concept Founder/CTO/Lead Developer, balancing engineering with the human responsibility of building something meant for real lives. At an expo night after presenting, people approached to say the product carried meaning beyond the demo. In the raw vault, the project is described as having over 500 users and partnerships with four universities, and being used to create a scholarship fund for Arab students from modest revenue.",
            "whatIDid": [
              "Led product + technical direction as Concept Founder/CTO/Lead Dev.",
              "Built Android app (Java/XML) and data layer with Firebase (Auth/Database).",
              "Implemented matching pipeline using NLP on interests and habits.",
              "Prototyped real-time/video flow with WebRTC + Firebase signaling.",
              "Documented third-party/privacy context and began security hardening."
            ],
            "impact": [
              "Over 500 users (as stated in the raw vault).",
              "Partnerships with four universities (as stated in the raw vault).",
              "Created a scholarship fund for Arab students from modest revenue."
            ],
            "evidence": [
              { "label": "RoofMate Expo Night repo", "url": "https://github.com/saidaz24-meet/RoofMateExpoNight" },
              { "label": "GitHub profile", "url": "https://github.com/saidaz24-meet" }
            ],
            "deepDive": "During my participation in MEET, I was part of a binational team—Arabs and Jews in Israel building something together. We created RoofMate, an app that pairs students as roommates with the belief that ordinary acts—shared meals, late-night conversations, study sessions—can quietly rewrite the future, one roommate pair at a time.\n\nDeveloping RoofMate required balancing diverse perspectives without minimizing anyone’s opinion. Successful collaboration means giving differences the space to meet in creative friction, forging something that serves a community larger than ourselves.\n\nOn exposition night, after we presented our design, I realized how hope reverberates out through a community. A student came up to thank us, eyes bright with possibility. Later, a father approached with his child beside him, clasped my hand, and I understood that what we built carried meaning well beyond our team."
          }
        },
      
        {
          "id": "pvl-internship",
          "type": "venture",
          "title": "Peptide Visual Lab",
          "date": "september 2025 - present",
          "tags": ["Research", "Craft", "Leadership", "Entrepreneurship"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/pvl/DESY-delegation/hero.jpg",
            "teaserVideo": "",
            "youtubeUrl": "https://youtu.be/8hQxsDMqzr4",
            "gallery": [
              "/images/life/pvl/DESY-delegation/IMG_1577.jpg",
              "/images/life/pvl/DESY-delegation/IMG_1656.jpg",
              "/images/life/pvl/DESY-delegation/IMG_1663.jpg",
              "/images/life/pvl/DESY-delegation/IMG_1667.jpg",
              "/images/life/pvl/DESY-delegation/IMG_1685.jpg",
              "/images/life/pvl/DESY-delegation/IMG_1762.jpg",
              "/images/life/pvl/DESY-delegation/IMG_9459_Original.jpg",
              "/images/life/pvl/DESY-delegation/hero.jpg",
              "/images/life/pvl/internship/g1-in-terminal.jpg",
              "/images/life/pvl/internship/g2-in-lab.jpg",
              "/images/life/pvl/internship/g3-in-lab.jpg",
              "/images/life/pvl/internship/g4-in-lab.jpg",
              "/images/life/pvl/internship/g5-reflection.jpg",
              "/images/life/pvl/internship/g6-reflection.jpg",
              "/images/life/pvl/internship/g7-reflection.jpg",
              "/images/life/pvl/internship/g8-group-pic.jpg",
              "/images/life/pvl/internship/g9-group-pic.jpg",
              "/images/life/pvl/internship/g10-group-pic.jpg",
              "/images/life/pvl/internship/g11-group-pic.jpg"
            ]
          },
          "card": {
            "oneLiner": "A privacy-first lab tool replacing peptide spreadsheets with insight.",
            "headline": "So scientists can focus on discovery, not spreadsheets",
            "subhead": "React/FastAPI system with caching, visualization, and auditability."
          },
          "beats": [
            "Manual triage became a product problem.",
            "CSV/UniProt → visual triage across web and mobile.",
            "Runs cached by sequence hash—less recompute, more insight.",
            "Built with React/TypeScript + FastAPI.",
            "Designed to ship into labs, not stay as scripts."
          ],
          "caseFile": {
            "context": "Peptide Visual Lab (PVL) is described in the raw vault as a privacy-first web app designed to help labs move from copy-paste triage to repeatable, visual, auditable analysis. The system supports CSV and UniProt-driven workflows and presents results through metric cards and drill-down peptide detail views. The vault notes the goal of shifting labs from one-off scripts toward a structured library of analyzed sequences, with caching keyed by sequence hash. The architecture listed includes a TypeScript/React web client, a Python/FastAPI backend, and a mobile mirror flow (React Native + Appwrite) for quick triage and single-sequence analysis. PVL also integrates predictors and calculations (the vault explicitly mentions TANGO and PSIPRED) and supports threshold configurations. The vault states an MVP was built in two weeks and mentions a part-time Technion offer and targeting lab deployments (targets are described as targets, not confirmed outcomes).",
            "whatIDid": [
              "Re-architected a stalled pipeline into a shippable end-to-end tool.",
              "Built the web client in React/TypeScript with visualization UI.",
              "Implemented backend endpoints in Python/FastAPI for upload/query/predict.",
              "Integrated TANGO and PSIPRED runs into a unified analysis flow.",
              "Designed caching by sequence hash and planned lab/server deployment."
            ],
            "impact": [
              "MVP built in two weeks (as stated in the raw vault).",
              "Designed to reduce repeated heavy recomputation via caching (vault).",
              "Targeting deployment to labs (stated as a target in the raw vault)."
            ],
            "evidence": [
              { "label": "PVL demo (YouTube)", "url": "https://youtu.be/8hQxsDMqzr4" },
              { "label": "GitHub profile", "url": "https://github.com/saidaz24-meet" }
            ],
            "deepDive": "Peptide Visual Lab (PVL) is a privacy-first web app I designed so scientists can focus on discovery, not spreadsheets.\n\nTech listed in the vault: React/TypeScript, FastAPI, Tailwind, Zustand, Recharts; plus a mobile mirror flow (React Native + Appwrite). Backend responsibilities include parsing CSV/Excel/UniProt, running TANGO and PSIPRED, and returning a shared threshold config with each run.\n\nData and vision (vault): results are cached by sequence hash and stored (Appwrite + Postgres mentioned) so labs can query an analysis landscape instead of recomputing from scratch.\n\nPersonal story (vault): I arrived at DESY with a simple question for Dr. Aleksandr Golubev—“Hit me with your bottlenecks.” Watching a team split time between benches and spreadsheets made the problem obvious.\n\nNote for reviewers (vault): the production repo is private due to lab privacy and internal paths; a clean, redacted case-study repo is maintained with identical architecture."
          }
        },
      
        {
          "id": "empowered",
          "type": "venture",
          "title": "EmpowerED",
          "date": "jan 2024 - april 2024",
          "tags": ["Community", "Leadership", "Entrepreneurship", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/empowered/g1-group-pic.JPG",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/empowered/g1-group-pic.JPG",
              "/images/life/empowered/g2-logo.png"
            ]
          },
          "card": {
            "oneLiner": "A short sprint where a team tried to build <FILL IN>.",
            "headline": "A team sprint toward something we wanted to fix",
            "subhead": "Artifacts and process are documented in Drive."
          },
          "beats": [
            "A focused build sprint: Jan–Apr 2024.",
            "Teamwork, iteration, and product decisions.",
            "Artifacts captured: brainstorming → building process.",
            "<FILL IN>",
            "Lessons I carried into later ventures."
          ],
          "caseFile": {
            "context": "EmpowerED appears in your inventory as a venture (Jan 2024–Apr 2024) with a Drive folder containing brainstorming and build artifacts. The raw vault does not include detailed narrative text for this item in the material provided, so I’m leaving core claims and outcomes as `<FILL IN>` until the vault section is added or expanded. The site will still present this as a chapter through a hero, a short beat sequence, and a case file that prioritizes process artifacts and evidence.",
            "whatIDid": [
              "<FILL IN>",
              "<FILL IN>",
              "<FILL IN>"
            ],
            "impact": [
              "<FILL IN>"
            ],
            "evidence": [
              {
                "label": "Drive folder (process artifacts)",
                "url": "https://drive.google.com/drive/folders/1Yyop00qaoglrnI4KusbC-cn5-R8Ua7Ni"
              }
            ],
            "deepDive": ""
          }
        },
      
        {
          "id": "huji-hackathon-win",
          "type": "honor",
          "title": "HUJI Hackathon – Winner",
          "date": "may 2025",
          "tags": ["Entrepreneurship", "Craft", "Community", "Leadership"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/huji-hackathon-win/hero.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/huji-hackathon-win/hero.jpg",
              "/images/life/huji-hackathon-win/g1-building.jpg",
              "/images/life/huji-hackathon-win/g2-debugging.jpg",
              "/images/life/huji-hackathon-win/g3-presenting.jpg",
              "/images/life/huji-hackathon-win/g4-winning.jpg",
              "/images/life/huji-hackathon-win/g5-web-screenshot.jpeg",
              "/images/life/huji-hackathon-win/g6-web-screenshot.jpeg"
            ]
          },
          "card": {
            "oneLiner": "Hackathon winner: built a tool that turns bureaucracy into conversation.",
            "headline": "Winner: building dignity into digital paperwork",
            "subhead": "A prototype born from helping an elder finish a form."
          },
          "beats": [
            "A waiting room turned into a product problem.",
            "A chat flow that meets people in their language.",
            "A form that took hours became minutes.",
            "Hackathon pressure—ship, test, pitch, repeat.",
            "Winning mattered. The use-case mattered more."
          ],
          "caseFile": {
            "context": "In the raw vault, the HUJI hackathon project is framed as a response to an elder struggling with bureaucratic digital paperwork. The narrative describes mapping the steps: finding the right form, decoding Hebrew, copying IDs, printing/signing/scanning, and hoping it works. The project (named “Shaman” in the vault) is described as a chat-based assistant that asks clarifying questions and helps complete forms in whatever language comes first. The vault claims a specific moment: a form that used to take an afternoon became feasible in about fourteen minutes. The emphasis is not “AI magic,” but dignity: making systems meet people where they are. You also included the official hackathon site and the repository as proof.",
            "whatIDid": [
              "Helped define a user story grounded in a real bureaucratic pain point.",
              "Built and shipped a prototype within hackathon constraints.",
              "Designed the flow around clarifying questions and language flexibility.",
              "Prepared and delivered the pitch/demo."
            ],
            "impact": [
              "HUJI Hackathon winner (May 2025).",
              "Vault describes a reduction from hours to ~14 minutes for one workflow."
            ],
            "evidence": [
              { "label": "HUJI Hackathon site", "url": "https://www.hujihackathon.com/" },
              { "label": "Project repo", "url": "https://github.com/saidaz24-meet/HUJI_Hackathon" }
            ],
            "deepDive": "I never meant to build an app that sounded like a mystic. “Shaman” was a joke—until I watched an elder shrink in a waiting room under the weight of a PDF.\n\nWe waited. I mapped her journey: find the right link, decode bureaucratic Hebrew, copy numbers, print-sign-scan-upload, and pray.\n\nBack home she sighed, “I’m too old for this new world.” And I heard the real sentence underneath: the world is too lazy to meet her.\n\nAt the hackathon, we built a prototype that asks questions in the user’s language and guides them through the paperwork like a conversation.\n\nIn fourteen minutes, a task that used to steal an afternoon became possible again."
          }
        },
      
        {
          "id": "meta-hackathon-win",
          "type": "honor",
          "title": "Meta Hackathon – Winner",
          "date": "august 2022",
          "tags": ["Entrepreneurship", "Craft", "Community"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/foom_meta_hackathon_win/g2-announcing-winners.JPG",
            "teaserVideo": "",
            "youtubeUrl": "https://www.youtube.com/watch?app=desktop&v=gDBhXQG5lmo",
            "gallery": [
              "/images/life/foom_meta_hackathon_win/g1-presenting-to-meta.jpg",
              "/images/life/foom_meta_hackathon_win/g2-announcing-winners.JPG"
            ]
          },
          "card": {
            "oneLiner": "Meta Hackathon winner — <FILL IN>.",
            "headline": "Winner: learning to ship under real pressure",
            "subhead": "Presentation link included; details in vault: <FILL IN>."
          },
          "beats": [
            "A stage. A deadline. A team under pressure.",
            "Pitching to judges—clarity or nothing.",
            "A win that taught me how to compress a story.",
            "<FILL IN>",
            "A chapter I still build from."
          ],
          "caseFile": {
            "context": "Your inventory confirms a Meta Hackathon win (Aug 2022) with local photos and a YouTube presentation link. The raw vault text provided does not include detailed narrative or technical specifics for this particular hackathon in the material I received, so I’m keeping the descriptive copy minimal and marking missing specifics as `<FILL IN>` until the relevant vault section is added.",
            "whatIDid": [
              "<FILL IN>",
              "<FILL IN>",
              "<FILL IN>"
            ],
            "impact": ["Meta Hackathon winner (Aug 2022)."],
            "evidence": [
              {
                "label": "Winning presentation (YouTube)",
                "url": "https://www.youtube.com/watch?app=desktop&v=gDBhXQG5lmo"
              }
            ],
            "deepDive": ""
          }
        },
      
        {
          "id": "bml-advanced-track",
          "type": "honor",
          "title": "BetterMind Labs – Advanced Track",
          "date": "july 2025 - present",
          "tags": ["Identity", "Leadership", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "",
            "teaserVideo": "",
            "youtubeUrl": "https://www.youtube.com/watch?v=rXLCb_o5eC8",
            "gallery": []
          },
          "card": {
            "oneLiner": "Selected for an advanced AI track; built MSSA for MEET teaching.",
            "headline": "From teaching chaos to a tool that helps",
            "subhead": "Advanced Track: 9 selected from 80 (vault)."
          },
          "beats": [
            "Teaching revealed the real bottleneck: prep time.",
            "So I built MSSA: an AI-powered teaching assistant.",
            "Refined with engineers; selected 9/80 for advanced track.",
            "Focused on deployment for MEET’s next cycle.",
            "AI as leverage—not novelty."
          ],
          "caseFile": {
            "context": "In the raw vault, after graduating in June 2025 you describe returning to MEET and taking on a Teaching Assistant role, then building MSSA (Meet Session Script Assistant), an AI-powered teaching assistant. The vault frames the problem as practical: instructors drowning in PDFs, slide decks, and scattered prep; new instructors struggling to build strong sessions. You describe product thinking—grounding outputs in slides, anticipating clarifying questions, and compressing messy needs into usable tools. The vault also states you were selected as one of nine students out of eighty for a 12-week Advanced Track in applied AI and product design, after refining MSSA under guidance and aiming to deploy it for MEET’s next teaching cycle.",
            "whatIDid": [
              "Identified instructor pain points by observing and teaching at MEET.",
              "Built MSSA to turn teaching materials into structured session assets.",
              "Iterated based on instructor feedback; focused on grounded outputs.",
              "Refined the tool under engineering guidance; prepared for deployment."
            ],
            "impact": [
              "Selected as 1 of 9 students out of 80 for a 12-week Advanced Track (vault).",
              "Built and refined MSSA to support MEET’s next teaching cycle (vault)."
            ],
            "evidence": [
              {
                "label": "MSSA repo",
                "url": "https://github.com/saidaz24-meet/meet-session-script-assistant"
              },
              {
                "label": "Advanced Track letter",
                "url": "https://drive.google.com/file/d/1sBxCysQzjNaGbi522Te04YaCgetFwuIj/view"
              },
              {
                "label": "Interview (YouTube)",
                "url": "https://www.youtube.com/watch?v=rXLCb_o5eC8"
              }
            ],
            "deepDive": "After completing LEAD, I returned to MEET as a Teaching Assistant. I began building an AI-powered teaching assistant—MSSA.\n\nWhat excites me isn’t the novelty of AI; it’s the leverage for educators: if a tool anticipates a clarifying question because we anticipated it; if a broken route handler becomes a working demo; if a new instructor gets a structure instead of chaos.\n\nUnder guidance, I refined MSSA and was selected as one of nine students out of eighty for the 12-week Advanced Track in applied AI and product design. The next steps were concrete: deploy MSSA for MEET’s next teaching cycle."
          }
        },
      
        {
          "id": "dabka",
          "type": "experience",
          "title": "Dabka (Dance)",
          "date": "2016 - present",
          "tags": ["Identity", "Community", "Movement"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/dabka/Budapest-international-festival.JPG",
            "teaserVideo": "",
            "youtubeUrl": "https://www.youtube.com/watch?v=ARY_L0_9DEc",
            "gallery": [
              "/images/life/dabka/Budapest-international-festival.JPG",
              "/images/life/dabka/spain-festival.JPG"
            ]
          },
          "card": {
            "oneLiner": "Nine years of Dabka—discipline, belonging, and motion.",
            "headline": "A decade of rhythm that kept me grounded",
            "subhead": "Six hours a week, even during the busiest seasons (vault)."
          },
          "beats": [
            "Nine years. Six hours a week.",
            "Movement as discipline, not escape.",
            "A troupe—community that holds you accountable.",
            "On stage: identity without explanation.",
            "Motion as a way to stay human."
          ],
          "caseFile": {
            "context": "The raw vault states you’ve maintained a long commitment to Dabka with your troupe for nine years, training about six hours per week. In the site, Dabka functions as more than “a hobby”: it’s a parallel training ground for discipline, teamwork, and presence—an embodied counterweight to screens, deadlines, and high-stakes building. The visual media (festival photos + a YouTube link) supports a cinematic chapter that keeps the reader feeling your consistency over time.",
            "whatIDid": [
              "Trained consistently in Dabka over multiple years (vault).",
              "Performed with a troupe in public settings (supported by media).",
              "<FILL IN: notable performances/roles if you want to specify>"
            ],
            "impact": [
              "Sustained a 9-year commitment (vault).",
              "Maintained ~6 hours/week training (vault)."
            ],
            "evidence": [
              { "label": "Performance video (YouTube)", "url": "https://www.youtube.com/watch?v=ARY_L0_9DEc" }
            ],
            "deepDive": ""
          }
        },
      
        {
          "id": "meet",
          "type": "experience",
          "title": "MEET (Middle East Entrepreneurs of Tomorrow)",
          "date": "2022 - present",
          "tags": ["Bridge-building", "Leadership", "Community", "Identity"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/meet/1d9300b2-2414-473f-90b8-e562e2899c34.JPG",
            "teaserVideo": "/teasers/meet.mov",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/meet/1d9300b2-2414-473f-90b8-e562e2899c34.JPG",
              "/images/life/meet/2b36274f-f88b-433f-b658-1700934ef121.JPG"
            ]
          },
          "card": {
            "oneLiner": "A place where building and dialogue happen in the same room.",
            "headline": "Where code becomes a language for trust",
            "subhead": "Binational collaboration that trained both craft and conscience."
          },
          "beats": [
            "You build, then you talk, then you build again.",
            "Differences don’t vanish; they become constraints.",
            "The team is the test: can you still ship?",
            "Projects become bridges you can actually walk on.",
            "MEET made my ambition more responsible."
          ],
          "caseFile": {
            "context": "In your raw vault, MEET appears as the environment where binational teamwork is not an abstract value but a daily constraint—balancing perspectives without minimizing anyone’s voice. You describe building projects (including RoofMate) inside this environment and experiencing how a demo can resonate beyond the room. MEET also appears later as the place you returned to as a Teaching Assistant, turning your learning loop into a teaching loop.",
            "whatIDid": [
              "Collaborated in binational teams on technical projects (vault).",
              "Used building as a vehicle for dialogue and shared ownership.",
              "<FILL IN: specific projects beyond RoofMate if you want listed>"
            ],
            "impact": [
              "<FILL IN: measurable outcomes you want publicly stated (if any)>"
            ],
            "evidence": [
              { "label": "MEET official site", "url": "https://www.meet.org/" }
            ],
            "deepDive": "During my participation in MEET, I was part of a binational team—Arabs and Jews in Israel building something together.\n\nSuccessful collaboration required giving differences space to come together in creative friction, forging something that serves a community larger than ourselves.\n\nThat experience taught me that innovation is not just a flash of a single mind; it’s a discipline of listening, negotiating constraints, and still delivering."
          }
        },
      
        {
          "id": "meet-ta",
          "type": "experience",
          "title": "MEET TA / Teaching Assistant",
          "date": "2024 - present",
          "tags": ["Leadership", "Community", "Craft", "Identity"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/meet-TA/g5-class-pic.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/meet-TA/g1-falling-in-love.jpg",
              "/images/life/meet-TA/g2-love-the-students.jpg",
              "/images/life/meet-TA/g3-students.jpg",
              "/images/life/meet-TA/g4-cool-pic-with-students-funny.jpg",
              "/images/life/meet-TA/g5-class-pic.jpg",
              "/images/life/meet-TA/g6-class-pic.jpg",
              "/images/life/meet-TA/g7-team-pic.jpg",
              "/images/life/meet-TA/g8-team-pic.jpg",
              "/images/life/meet-TA/g9-me-as-a-funny-ta.jpg"
            ]
          },
          "card": {
            "oneLiner": "Teaching CS where the real lesson is agency, not syntax.",
            "headline": "Turning confusion into confidence, one student at a time",
            "subhead": "The teaching chapter that led directly to building MSSA."
          },
          "beats": [
            "Tracebacks as puzzles, not failures.",
            "Prep nights: teaching is engineering too.",
            "I watched what students fear—and what helps.",
            "Then I built tools to scale that help.",
            "Leadership is patience with a deadline."
          ],
          "caseFile": {
            "context": "The raw vault describes your MEET teaching as deeply hands-on: long sessions plus late-night preparation, learning the rhythm of when students struggle, and treating a traceback like a puzzle to solve together. You describe shifting from “teaching content” to “designing learning”—distilling messy needs into structured outputs and being strict about grounding explanations in real materials. This chapter directly connects to the MSSA build, because you treated teaching pain points as solvable system bottlenecks.",
            "whatIDid": [
              "Taught and supported students during CS sessions (vault).",
              "Studied what makes sessions succeed: instructor flow and student friction.",
              "Prototyped tooling ideas from observed pain points (vault)."
            ],
            "impact": [
              "<FILL IN: number of sessions/students if you want stated publicly>"
            ],
            "evidence": [
              {
                "label": "MSSA repo (teaching tool)",
                "url": "https://github.com/saidaz24-meet/meet-session-script-assistant"
              }
            ],
            "deepDive": ""
          }
        },
      
        {
          "id": "school-leyada",
          "type": "experience",
          "title": "Leyada (Hebrew University Secondary School)",
          "date": "2019 - 2025",
          "tags": ["Identity", "Leadership", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/school-leyada/g2-graduating.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": [
              "/images/life/school-leyada/g1-learning-life-lessons-with-friends.jpg",
              "/images/life/school-leyada/g2-graduating.jpg",
              "/images/life/school-leyada/g3-graduating-with-teachers.jpg",
              "/images/life/school-leyada/g4-graudation-friends-for-life.jpg",
              "/images/life/school-leyada/g6-scores-bagrut-and-sat-accomplishments.jpg"
            ]
          },
          "card": {
            "oneLiner": "A demanding school chapter where I learned to earn my space.",
            "headline": "Where rigor met identity, and neither stayed simple",
            "subhead": "Advanced STEM environment; physics linked to Weizmann (vault)."
          },
          "beats": [
            "A school built for advanced STEM intensity.",
            "Rigor that forced structure, not just talent.",
            "Identity lived inside the same hallways.",
            "Friendships and friction—both taught me.",
            "I left with momentum, not closure."
          ],
          "caseFile": {
            "context": "Your raw vault describes Leyada as among Israel’s leading institutions for advanced STEM, including a physics program developed with the Weizmann Institute of Science. In the same doc, you also describe personal reflection rituals—climbing to the roof at night to write, sketch, and quiet the noise—using stillness to reset your mind. This chapter works best on the site as a bridge between internal world and external performance: rigor, identity, and self-discipline coexisting in one timeline.",
            "whatIDid": [
              "Completed secondary school in a rigorous advanced-STEM environment (vault).",
              "Sustained personal reflection practices that supported consistency (vault).",
              "<FILL IN: specific school achievements you want summarized from g6 image>"
            ],
            "impact": [
              "<FILL IN: public academic outcomes if you want them stated explicitly>"
            ],
            "evidence": [
              { "label": "Leyada official site", "url": "https://www.leyada.net/" }
            ],
            "deepDive": "Most nights, I climb to the roof.\n\nSometimes I write in a notebook, sometimes I sketch, sometimes I just stare at the sky. The wind cools my skin and carries the faint hum of a neighbor’s TV as the streetlights flicker on, one by one.\n\nThere is a simple joy in sitting where the world is wide and unsorted—in letting my thoughts be the same. I trace constellations the way people have for thousands of years: looking up, waiting for patterns, turning points of light into stories.\n\nWhen I climb back down, the world below hasn’t changed—but somehow, each time, I have."
          }
        },
      
        {
          "id": "volunteering",
          "type": "experience",
          "title": "Volunteering",
          "date": "2022 - 2025",
          "tags": ["Community", "Leadership"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/life/volunteering/hero.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": []
          },
          "card": {
            "oneLiner": "Showing up consistently where people actually need you.",
            "headline": "Service that trained my patience and responsibility",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "Less about hours. More about presence.",
            "<FILL IN>",
            "Serving without needing a stage.",
            "Learning sacrifice as a real skill.",
            "Building a life that’s useful to others."
          ],
          "caseFile": {
            "context": "Your inventory includes Volunteering (2022–2025) with a verified hero image. The raw vault references service and sacrifice in multiple places, but the specific volunteering details for this item are not fully spelled out in the provided material, so outcomes and specific roles are marked as `<FILL IN>` until the relevant vault section is added.",
            "whatIDid": ["<FILL IN>", "<FILL IN>", "<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "be-useful",
          "type": "book",
          "title": "Be Useful",
          "date": "<FILL IN>",
          "tags": ["Leadership", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/be_useful/9780593792988.jpeg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/be_useful/9780593792988.jpeg"]
          },
          "card": {
            "oneLiner": "A book that I return to when I need structure.",
            "headline": "A reminder to choose action over noise",
            "subhead": "<FILL IN: what you took from it>"
          },
          "beats": [
            "A book I keep close for discipline.",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "rich-dad-poor-dad",
          "type": "book",
          "title": "Rich Dad Poor Dad",
          "date": "<FILL IN>",
          "tags": ["Entrepreneurship", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/rich_dad_poor_dad/0013778173-L.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/rich_dad_poor_dad/0013778173-L.jpg"]
          },
          "card": {
            "oneLiner": "A book that shaped how I think about value and ownership.",
            "headline": "Learning to think in systems, not salaries",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "start-with-why",
          "type": "book",
          "title": "Start With Why",
          "date": "<FILL IN>",
          "tags": ["Leadership", "Identity"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/start_with_why/images_1.jpeg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/start_with_why/images_1.jpeg"]
          },
          "card": {
            "oneLiner": "A book I use to pressure-test mission vs. ego.",
            "headline": "Finding the why before building the how",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "the-almanack",
          "type": "book",
          "title": "The Almanack of Naval Ravikant",
          "date": "<FILL IN>",
          "tags": ["Entrepreneurship", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/the_almanack/the-almanack-of-naval-ravikant-9798893310948_lg.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/the_almanack/the-almanack-of-naval-ravikant-9798893310948_lg.jpg"]
          },
          "card": {
            "oneLiner": "A book that challenged how I define success.",
            "headline": "Wealth, leverage, and clarity—without the noise",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "the-power-of-now",
          "type": "book",
          "title": "The Power of Now",
          "date": "<FILL IN>",
          "tags": ["Identity"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/the_power_of_now/9780340733509.jpg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/the_power_of_now/9780340733509.jpg"]
          },
          "card": {
            "oneLiner": "A book that helped me notice what my mind skips past.",
            "headline": "Learning presence as a daily discipline",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "think-again",
          "type": "book",
          "title": "Think Again",
          "date": "<FILL IN>",
          "tags": ["Craft", "Leadership"],
          "privacy": "public",
          "media": {
            "heroImage": "/images/book/think_again/9781984878106.jpeg",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": ["/images/book/think_again/9781984878106.jpeg"]
          },
          "card": {
            "oneLiner": "A book that reminded me to treat beliefs like prototypes.",
            "headline": "Rewriting opinions with the humility to learn",
            "subhead": "<FILL IN>"
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        },
      
        {
          "id": "7-habits-teen",
          "type": "book",
          "title": "The 7 Habits of Highly Effective Teens",
          "date": "<FILL IN>",
          "tags": ["Leadership", "Craft"],
          "privacy": "public",
          "media": {
            "heroImage": "",
            "teaserVideo": "",
            "youtubeUrl": "",
            "gallery": []
          },
          "card": {
            "oneLiner": "A book I associate with building structure early.",
            "headline": "Habits as architecture, not motivation",
            "subhead": "Cover missing; add later."
          },
          "beats": [
            "<FILL IN>",
            "<FILL IN>",
            "<FILL IN>"
          ],
          "caseFile": {
            "context": "<FILL IN: your personal takeaway from this book>",
            "whatIDid": ["<FILL IN>"],
            "impact": ["<FILL IN>"],
            "evidence": [],
            "deepDive": ""
          }
        }
      ];
