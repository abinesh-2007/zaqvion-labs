"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  Clipboard,
  Heart,
  Menu,
  MessageCircle,
  Scale,
  Search,
  X,
} from "lucide-react";
import { Project, projects, bySlug } from "../lib/projects";
import { categoryImages, serviceImages } from "../lib/site-images";
const WA = "916374413038",
  greet = "Hello ZAQVION LABS, I would like to know more about your services.";
const wa = (text: string) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;
const nav = [
  ["Explore Projects", "/explore-projects"],
  ["Services", "/services"],
  ["Knowledge Centre", "/knowledge-centre"],
  ["About", "/about-us"],
  ["Contact", "/contact"],
];
const read = (key: string): string[] => {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
};
function useList(key: string, max = Infinity) {
  const [list, setList] = useState<string[]>([]);
  const [note, setNote] = useState("");
  useEffect(() => setList(read(key)), [key]);
  const update = (v: string[] | ((x: string[]) => string[])) =>
    setList((x) => {
      const n = typeof v === "function" ? v(x) : v;
      localStorage.setItem(key, JSON.stringify(n));
      return n;
    });
  const toggle = (id: string) =>
    update((x) => {
      if (x.includes(id)) return x.filter((v) => v !== id);
      if (x.length >= max) {
        setNote(`You can compare up to ${max} projects.`);
        return x;
      }
      setNote("");
      return [...x, id];
    });
  return { list, toggle, update, note };
}
function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <Link href="/" className="brand">
        <i>⌁</i> ZAQVION <span>LABS</span>
        <Image className="brandLogo" src="/images/brand/zaqvion-logo.png" alt="ZAQVION LABS" width={32} height={32} priority />
      </Link>
      <nav>
        {nav.map(([x, h]) => (
          <Link key={h} href={h}>
            {x}
          </Link>
        ))}
      </nav>
      <button
        className="menu"
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <aside className="mobileNav">
          {nav.map(([x, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {x}
            </Link>
          ))}
          <Link href="/custom-project-builder">Build a custom project</Link>
        </aside>
      )}
    </header>
  );
}
function Footer() {
  return (
    <footer>
      <div>
        <Link href="/" className="brand">
          <i>⌁</i> ZAQVION <span>LABS</span>
          <Image className="brandLogo" src="/images/brand/zaqvion-logo.png" alt="ZAQVION LABS" width={30} height={30} />
        </Link>
        <p>Engineering Ideas Into Working Systems.</p>
        <a href="mailto:abinesh10sangee07@gmail.com">abinesh10sangee07@gmail.com</a>
      </div>
      <div>
        <Link href="/faq">FAQ</Link>
        <Link href="/privacy-policy">Privacy</Link>
        <Link href="/terms-and-conditions">Terms</Link>
      </div>
    </footer>
  );
}
function Visual({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <figure className={`visual ${large ? "large" : ""}`}>
      <Image
        src={p.image.src}
        alt={p.image.alt}
        fill
        sizes={
          large
            ? "(max-width: 780px) 100vw, 48vw"
            : "(max-width: 780px) 100vw, (max-width: 1100px) 50vw, 33vw"
        }
        priority={large}
      />
      <figcaption>
        <span>{p.image.label}</span>
        <small>Illustrative reference</small>
      </figcaption>
    </figure>
  );
}
function CategoryVisual({ kind }: { kind: "hardware" | "software" }) {
  const image = categoryImages[kind];
  if (image.available)
    return (
      <figure className="categoryVisual">
        <Image src={image.expectedPath} alt={image.alt} fill sizes="(max-width: 780px) 100vw, 50vw" />
      </figure>
    );
  return (
    <figure className="categoryVisual categoryVisualMissing" role="img" aria-label={`${image.label}; add ${image.expectedPath}`}>
      <span>VISUAL ASSET REQUESTED</span>
      <strong>{image.label}</strong>
      <small>{image.expectedPath}</small>
    </figure>
  );
}
function Card({
  p,
  favs,
  compare,
}: {
  p: Project;
  favs: ReturnType<typeof useList>;
  compare: ReturnType<typeof useList>;
}) {
  const f = favs.list.includes(p.id),
    c = compare.list.includes(p.id);
  return (
    <article className="projectCard">
      <Visual p={p} />
      <p className="eyebrow">
        {p.category} / {p.domain}
      </p>
      <h3>{p.title}</h3>
      <p>{p.summary}</p>
      <div className="tags">
        {p.technologies.slice(0, 2).map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="cardActions">
        <Link href={`/projects/${p.slug}`}>
          Details <ArrowRight size={14} />
        </Link>
        <button onClick={() => compare.toggle(p.id)} aria-pressed={c}>
          <Scale size={15} />
          {c ? "Added" : "Compare"}
        </button>
        <button
          onClick={() => favs.toggle(p.id)}
          aria-pressed={f}
          aria-label="Save favourite"
        >
          <Heart size={16} fill={f ? "currentColor" : "none"} />
        </button>
      </div>
    </article>
  );
}
function Intro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="pageIntro">
      <p className="eyebrow">{label}</p>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  );
}
function Empty({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <div className="empty">
      <h2>{title}</h2>
      <p>{text}</p>
      <Link className="primary" href={href}>
        Explore projects <ArrowRight size={16} />
      </Link>
    </div>
  );
}
function Catalogue({ initial = "All" }: { initial?: string }) {
  const favs = useList("zq-favs"),
    compare = useList("zq-compare", 3);
  const [q, setQ] = useState(""),
    [cat, setCat] = useState(initial);
  const shown = useMemo(
    () =>
      projects.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          `${p.title} ${p.domain} ${p.technologies}`
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [q, cat],
  );
  return (
    <>
      <Intro
        label="PROJECT CATALOGUE"
        title="Find a system worth building."
        text="Browse published directions, then discuss your precise requirements privately."
      />
      <section className="catalogue">
        <div className="filters">
          <label>
            <Search size={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects"
            />
          </label>
          <div>
            {["All", "Hardware", "Software"].map((x) => (
              <button
                className={x === cat ? "active" : ""}
                key={x}
                onClick={() => setCat(x)}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="compareBar">
          <span>{compare.list.length} of 3 selected for comparison</span>
          <Link href="/comparison">
            Review comparison <ArrowRight size={14} />
          </Link>
        </div>
        {compare.note && <p className="formError">{compare.note}</p>}
        {shown.length ? (
          <div className="projectGrid">
            {shown.map((p) => (
              <Card key={p.id} p={p} favs={favs} compare={compare} />
            ))}
          </div>
        ) : (
          <Empty
            title="No matching projects"
            text="Try clearing a filter or using a broader term."
            href="/explore-projects"
          />
        )}
      </section>
    </>
  );
}
function Enquiry({ project }: { project?: Project }) {
  const [error, setError] = useState(""),
    // Kept only for the unreachable browser-navigation fallback rendering.
    [done] = useState<{ id: string; message: string } | null>(null),
    [copied, setCopied] = useState(false);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget),
      name = String(d.get("name") || "").trim(),
      phone = String(d.get("phone") || "").trim(),
      email = String(d.get("email") || "").trim(),
      org = String(d.get("org") || "").trim(),
      type = String(d.get("type") || ""),
      details = String(d.get("details") || "").trim(),
      timeline = String(d.get("timeline") || "").trim(),
      title = project?.title || String(d.get("project") || "Custom project");
    if (!name || !phone || !email || !details) {
      setError(
        "Please complete your name, WhatsApp number, email and requirements.",
      );
      return;
    }
    setError("");
    const id = `ZQ-${Date.now().toString().slice(-8)}`,
      message = `Hello ZAQVION LABS!\n\nI am interested in your project.\n\nName: ${name}\nWhatsApp: ${phone}\nEmail: ${email}\nCollege/Company: ${org || "Not provided"}\n\nProject: ${title}\nRequirement Type: ${type}\n\nMy Requirements: ${details}\n\nExpected Timeline: ${timeline || "Not provided"}\n\nPlease contact me to discuss the project and quotation.\n\nThank you!`;
    const old = JSON.parse(localStorage.getItem("zq-enquiries") || "[]");
    localStorage.setItem(
      "zq-enquiries",
      JSON.stringify([
        ...old,
        {
          id,
          title,
          name,
          phone,
          email,
          org,
          type,
          details,
          timeline,
          createdAt: new Date().toISOString(),
        },
      ]),
    );
    // Remain in the submit event so mobile browsers can hand off directly
    // to WhatsApp and desktop browsers can open WhatsApp Web.
    window.location.assign(wa(message));
  }
  if (done)
    return (
      <section className="success">
        <Check />
        <p className="eyebrow">ENQUIRY PREPARED</p>
        <h2>Reference: {done.id}</h2>
        <p>
          Your enquiry is retained in this browser. WhatsApp opens a prepared
          message—you choose whether to send it.
        </p>
        <a
          className="primary"
          href={wa(done.message)}
          target="_blank"
          rel="noreferrer"
        >
          Open WhatsApp <MessageCircle size={17} />
        </a>
        <button
          className="copy"
          onClick={() => {
            navigator.clipboard?.writeText(done.message);
            setCopied(true);
          }}
        >
          <Clipboard size={15} />
          {copied ? "Copied" : "Copy prepared message"}
        </button>
      </section>
    );
  return (
    <form className="enquiry" onSubmit={submit}>
      <p className="eyebrow">PRIVATE REQUIREMENTS DISCUSSION</p>
      <h2>
        {project ? `Enquire about ${project.title}` : "Tell us what you need."}
      </h2>
      {!project && (
        <label>
          Project title (optional)
          <input name="project" />
        </label>
      )}
      <div className="formgrid">
        <label>
          Full name
          <input name="name" required />
        </label>
        <label>
          WhatsApp number
          <input name="phone" inputMode="tel" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          College or company
          <input name="org" />
        </label>
        <label>
          Requirement type
          <select name="type">
            <option>Complete project</option>
            <option>Components kit</option>
            <option>Source code and documentation</option>
            <option>Customization</option>
            <option>Technical guidance</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Expected timeline
          <input name="timeline" />
        </label>
      </div>
      <label>
        Detailed requirements
        <textarea
          name="details"
          required
          placeholder="Describe the problem, expected outcome and technical context"
        />
      </label>
      {error && <p className="formError">{error}</p>}
      <button className="primary" type="submit">
        Prepare enquiry <ArrowRight size={16} />
      </button>
      <p className="formNote">
        A quotation is discussed privately. A prepared WhatsApp message opens
        next; you decide whether to send it. Supabase saving requires server-side
        integration and credentials.
      </p>
    </form>
  );
}
function Detail({ p }: { p: Project }) {
  const favs = useList("zq-favs"),
    compare = useList("zq-compare", 3);
  return (
    <>
      <section className="detailHero">
        <div>
          <p className="eyebrow">
            {p.category} / {p.domain}
          </p>
          <h1>{p.title}</h1>
          <p>{p.summary}</p>
          <div className="heroActions">
            <button className="secondary" onClick={() => favs.toggle(p.id)}>
              <Heart
                size={16}
                fill={favs.list.includes(p.id) ? "currentColor" : "none"}
              />
              Save favourite
            </button>
            <button className="secondary" onClick={() => compare.toggle(p.id)}>
              <Scale size={16} />
              Add to compare
            </button>
          </div>
        </div>
        <Visual p={p} large />
      </section>
      <section className="detailGrid">
        <article>
          <h2>The problem</h2>
          <p>{p.problem}</p>
          <h2>Proposed solution</h2>
          <p>{p.solution}</p>
          <h2>Key features</h2>
          <ul>
            {p.features.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>Technologies</h2>
          <div className="tags">
            {p.technologies.map((x) => (
              <span key={x}>{x}</span>
            ))}
          </div>
          <h2>Applications</h2>
          <ul>
            {p.applications.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>Safety and technical limitations</h2>
          <ul>
            {p.limitations.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <h2>Frequently asked questions</h2>
          <p>
            Final components, compatibility, testing and documentation are
            confirmed during the requirements discussion.
          </p>
        </article>
        <Enquiry project={p} />
      </section>
    </>
  );
}
function Recommender() {
  const [step, setStep] = useState(0),
    [a, setA] = useState<string[]>([]);
  const qs: [string, string[]][] = [
    ["What kind of project are you exploring?", ["Hardware", "Software"]],
    [
      "Which context interests you most?",
      [
        "Agriculture",
        "Education",
        "Civic technology",
        "Health & safety",
        "Automation",
      ],
    ],
    [
      "What is the intended use?",
      ["Academic project", "Business requirement", "Personal idea"],
    ],
  ];
  if (step < qs.length) {
    const [q, opts] = qs[step];
    return (
      <section className="assistant">
        <p className="eyebrow">PROJECT RECOMMENDATION ASSISTANT</p>
        <h1>{q}</h1>
        <p>
          Step {step + 1} of {qs.length}. Recommendations use transparent
          matching rules.
        </p>
        <div className="choiceGrid">
          {opts.map((x) => (
            <button
              key={x}
              onClick={() => {
                setA([...a, x]);
                setStep(step + 1);
              }}
            >
              {x}
              <ArrowRight />
            </button>
          ))}
        </div>
        {step > 0 && (
          <button
            className="secondary"
            onClick={() => {
              setA(a.slice(0, -1));
              setStep(step - 1);
            }}
          >
            Back
          </button>
        )}
      </section>
    );
  }
  const result = projects
    .filter((p) => p.category === a[0])
    .sort(
      (x, y) =>
        Number(y.domain.toLowerCase().includes(a[1].toLowerCase())) -
        Number(x.domain.toLowerCase().includes(a[1].toLowerCase())),
    )
    .slice(0, 4);
  return (
    <section className="assistant">
      <p className="eyebrow">YOUR MATCHES</p>
      <h1>A practical starting point.</h1>
      <p>
        These directions align with {a.join(" / ")}. Final fit depends on your
        requirements.
      </p>
      <div className="miniList">
        {result.map((p) => (
          <Link key={p.id} href={`/projects/${p.slug}`}>
            <strong>{p.title}</strong>
            <span>
              Matches {p.category.toLowerCase()} direction and{" "}
              {p.domain.toLowerCase()} context <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
      <button
        className="secondary"
        onClick={() => {
          setStep(0);
          setA([]);
        }}
      >
        Change answers
      </button>
    </section>
  );
}
function Comparison() {
  const compare = useList("zq-compare", 3),
    chosen = projects.filter((p) => compare.list.includes(p.id));
  return (
    <section className="pageContent">
      <p className="eyebrow">PROJECT COMPARISON</p>
      <h1>Compare directions, not prices.</h1>
      {chosen.length ? (
        <>
          <button className="secondary" onClick={() => compare.update([])}>
            Clear comparison
          </button>
          <div className="comparison">
            {chosen.map((p) => (
              <article key={p.id}>
                <button className="remove" onClick={() => compare.toggle(p.id)}>
                  Remove
                </button>
                <Visual p={p} />
                <h2>{p.title}</h2>
                <h3>Problem</h3>
                <p>{p.problem}</p>
                <h3>Technologies</h3>
                <p>{p.technologies.join(" · ")}</p>
                <h3>Applications</h3>
                <p>{p.applications.join(" · ")}</p>
                <Link href={`/projects/${p.slug}`}>
                  View details <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
          <Link className="primary" href="/custom-project-builder">
            Enquire about selected projects <ArrowRight size={16} />
          </Link>
        </>
      ) : (
        <Empty
          title="No projects selected"
          text="Add up to three directions from the catalogue."
          href="/explore-projects"
        />
      )}
    </section>
  );
}
function Favourites() {
  const favs = useList("zq-favs"),
    compare = useList("zq-compare", 3),
    chosen = projects.filter((p) => favs.list.includes(p.id));
  return (
    <section className="pageContent">
      <p className="eyebrow">MY FAVOURITES</p>
      <h1>Keep promising directions close.</h1>
      {chosen.length ? (
        <div className="projectGrid">
          {chosen.map((p) => (
            <Card key={p.id} p={p} favs={favs} compare={compare} />
          ))}
        </div>
      ) : (
        <Empty
          title="No favourites yet"
          text="Saved projects stay available in this browser."
          href="/explore-projects"
        />
      )}
    </section>
  );
}
function About() {
  const caps = [
    "Hardware and Electronics",
    "Embedded Systems",
    "IoT and Automation",
    "Software Development",
    "AI and Intelligent Applications",
    "Custom Engineering Projects",
  ];
  return (
    <>
      <section className="aboutHero">
        <Image
          src="/images/hero/engineering-lab.jpg"
          alt="Engineering laboratory workspace with electronics development equipment"
          fill
          priority
          sizes="100vw"
        />
        <div>
          <p className="eyebrow">ABOUT ZAQVION LABS</p>
          <h1>Engineering with context.</h1>
          <p>
            ZAQVION LABS is an engineering-focused technology initiative working
            across hardware, embedded systems, software and connected
            technologies.
          </p>
          <a
            className="primary"
            href={wa(greet)}
            target="_blank"
            rel="noreferrer"
          >
            Start on WhatsApp <MessageCircle size={16} />
          </a>
        </div>
      </section>
      <section className="aboutGrid">
        <article>
          <p className="eyebrow">OUR VISION</p>
          <h2>Practical technology for real-world problems.</h2>
          <p>
            To make practical engineering and technology solutions accessible
            and useful for real-world problems.
          </p>
        </article>
        <article>
          <p className="eyebrow">OUR MISSION</p>
          <ul>
            <li>Turn ideas into practical working solutions.</li>
            <li>Encourage engineering innovation.</li>
            <li>Develop hardware and software solutions.</li>
            <li>Support students and project teams.</li>
            <li>Explore useful IoT and automation applications.</li>
            <li>Build customised solutions around requirements.</li>
          </ul>
        </article>
      </section>
      <section className="pageContent">
        <p className="eyebrow">WHAT WE DO</p>
        <div className="capabilityList">
          {caps.map((x, i) => (
            <article key={x}>
              <Image
                src={serviceImages[i].src}
                alt={serviceImages[i].alt}
                width={600}
                height={320}
                sizes="(max-width: 780px) 100vw, 33vw"
              />
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{x}</h3>
              <p>
                Requirements-led support shaped around the problem to solve.
              </p>
              <Link href="/custom-project-builder">
                Discuss a requirement <ArrowRight size={13} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="process">
        <p className="eyebrow">OUR APPROACH</p>
        <div>
          {[
            "Understand the problem",
            "Discuss requirements",
            "Identify a technical solution",
            "Prepare proposal and private quotation",
            "Develop the solution",
            "Test and review",
            "Deliver the agreed solution",
          ].map((x, i) => (
            <article key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{x}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className="aboutGrid">
        <article>
          <p className="eyebrow">WHO WE SERVE</p>
          <p>
            Engineering students, college project teams, educational
            institutions, startups, small businesses and individuals with
            technology ideas.
          </p>
        </article>
        <article>
          <p className="eyebrow">WHY CHOOSE US</p>
          <p>
            A practical engineering approach, hardware and software integration,
            customisable solutions, clear communication and requirement-based
            development.
          </p>
        </article>
      </section>
      <Cta title="Have an idea? Let’s build it together." />
    </>
  );
}
function Cta({
  title = "Bring the problem. We’ll help frame the system.",
}: {
  title?: string;
}) {
  return (
    <section className="customCta">
      <p className="eyebrow">PRIVATE REQUIREMENTS DISCUSSION</p>
      <h2>{title}</h2>
      <Link className="primary" href="/custom-project-builder">
        Build a custom project <ArrowRight size={17} />
      </Link>
    </section>
  );
}
function Reviews({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(!compact);
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const subject = String(form.get("subject") || "").trim();
    const rating = Number(form.get("rating") || 0);
    const message = String(form.get("message") || "").trim();
    if (!name || !subject || !message || rating < 1 || rating > 5) {
      setError("Please add your name, project or service, rating and review.");
      return;
    }
    setError("");
    setState("loading");
    window.setTimeout(() => setState("success"), 500);
  };
  return (
    <section className={compact ? "reviews" : "pageContent reviews"}>
      <p className="eyebrow">CUSTOMER REVIEWS</p>
      <h2>What People Say About Us</h2>
      <p className="reviewLead">Your experience and feedback help us build better technology solutions.</p>
      {state === "success" ? (
        <div className="reviewState success">
          <Check />
          <h3>Review prepared for moderation</h3>
          <p>Persistent review storage requires Supabase configuration. No review has been published publicly.</p>
        </div>
      ) : open ? (
        <form className="reviewForm" onSubmit={submit}>
          <label>Full name<input name="name" required autoComplete="name" /></label>
          <label>College or company <small>(optional)</small><input name="organisation" /></label>
          <label>Project or service<input name="subject" required /></label>
          <label>Star rating<select name="rating" required defaultValue=""><option value="" disabled>Select rating</option>{[1,2,3,4,5].map(x=><option value={x} key={x}>{x} star{x > 1 ? "s" : ""}</option>)}</select></label>
          <label className="reviewMessage">Written review<textarea name="message" required minLength={20} placeholder="Tell us about your experience (at least 20 characters)." /></label>
          {error && <p className="formError" role="alert">{error}</p>}
          <button className="primary" disabled={state === "loading"}>{state === "loading" ? "Preparing review…" : "Submit for moderation"}</button>
          <p className="formNote">Reviews require approval before they can appear publicly.</p>
        </form>
      ) : (
        <div className="reviewState">
          <p>Be among the first to share your experience with ZAQVION LABS.</p>
          <button className="primary" onClick={() => setOpen(true)}>Write a Review</button>
        </div>
      )}
    </section>
  );
}
function Info({ page }: { page: string }) {
  const info: Record<string, [string, string, string?]> = {
    services: [
      "Services",
      "Explore hardware, embedded, IoT, software, intelligent applications and custom engineering directions.",
      "/custom-project-builder",
    ],
    contact: [
      "Start a conversation.",
      "Use WhatsApp or the custom enquiry builder to share a requirement.",
    ],
    faq: [
      "Questions, answered honestly.",
      "Project scope, delivery and support are confirmed for each private discussion.",
      "/custom-project-builder",
    ],
    "knowledge-centre": [
      "Knowledge centre",
      "Guidance articles can be added when verified content is ready. For now, start a private project discussion.",
      "/custom-project-builder",
    ],
    "privacy-policy": [
      "Privacy policy",
      "Business-owner policy content must be configured before publication.",
    ],
    "terms-and-conditions": [
      "Terms and conditions",
      "Business-owner terms must be configured before publication.",
    ],
    "customer-login": [
      "Customer login",
      "Authentication requires Supabase credentials and server-side configuration.",
    ],
    "customer-registration": [
      "Customer registration",
      "Secure registration requires Supabase configuration.",
    ],
    "customer-dashboard": [
      "Customer dashboard",
      "Private project records require authenticated Supabase customer accounts.",
    ],
    "project-progress-tracker": [
      "Project progress tracker",
      "Private progress records require authenticated customer accounts.",
    ],
    admin: [
      "Admin dashboard",
      "Admin access requires server-side role checks and Supabase configuration.",
    ],
  };
  const [title, text, href] = info[page] || [
    "Page not found",
    "The requested page is unavailable.",
  ];
  return (
    <section className="info">
      <p className="eyebrow">ZAQVION LABS</p>
      <h1>{title}</h1>
      <p>{text}</p>
      {page === "contact" ? (
        <div className="contactActions">
          <Image className="contactLogo" src="/images/brand/zaqvion-logo.png" alt="ZAQVION LABS" width={72} height={72} />
          <a className="primary" href={wa(greet)} target="_blank" rel="noreferrer">WhatsApp ZAQVION LABS <MessageCircle size={16} /></a>
          <a className="secondary" href="mailto:abinesh10sangee07@gmail.com">abinesh10sangee07@gmail.com</a>
          <Link className="secondary" href="/custom-project-builder">Build a custom project <ArrowRight size={16} /></Link>
        </div>
      ) : (
        href && (
          <Link className="primary" href={href}>
            Start a private enquiry <ArrowRight size={16} />
          </Link>
        )
      )}
    </section>
  );
}
function Home() {
  const favs = useList("zq-favs"),
    compare = useList("zq-compare", 3);
  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">ENGINEERING IDEAS INTO WORKING SYSTEMS</p>
          <h1>
            Engineering ideas into <em>working systems.</em>
          </h1>
          <p>
            From embedded electronics and IoT to software and intelligent
            applications, ZAQVION LABS develops practical technology solutions
            around real-world requirements.
          </p>
          <div className="heroActions">
            <Link className="primary" href="/explore-projects">
              Explore projects <ArrowRight size={17} />
            </Link>
            <Link className="secondary" href="/custom-project-builder">
              Build a custom project
            </Link>
          </div>
        </div>
        <div className="heroVisual">
          <Image
            src="/images/hero/engineering-lab.jpg"
            alt="Engineering laboratory workbench with electronics development equipment"
            fill
            priority
            sizes="(max-width: 780px) 100vw, 45vw"
          />
        </div>
      </section>
      <section className="introBand">
        <p className="eyebrow">ZAQVION LABS</p>
        <h2>Practical engineering starts with a clear problem.</h2>
        <p>
          Explore project directions or bring an idea to a private requirements
          discussion.
        </p>
      </section>
      <section className="serviceShowcase">
        <p className="eyebrow">WHAT WE DO</p>
        <div>
          {[
            [
              "Hardware and Electronics",
              "Systems that connect sensors, controls and real-world outcomes.",
            ],
            [
              "Embedded Systems",
              "Focused device intelligence shaped around a specific use case.",
            ],
            [
              "IoT and Automation",
              "Connected sensing and response for useful, practical workflows.",
            ],
            [
              "Software Development",
              "Clear digital tools designed around people and processes.",
            ],
            [
              "AI and Intelligent Applications",
              "Thoughtful intelligent interfaces where a suitable approach is identified.",
            ],
            [
              "Custom Engineering",
              "A requirements-led route from a challenge to a working direction.",
            ],
          ].map(([x, description], i) => (
            <article key={x}>
              <Image
                src={serviceImages[i].src}
                alt={serviceImages[i].alt}
                width={600}
                height={320}
                sizes="(max-width: 780px) 100vw, 33vw"
              />
              <span>0{i + 1}</span>
              <h3>{x}</h3>
              <p>{description}</p>
              <Link href="/services">
                Learn more <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="categorySplit">
        <Link href="/hardware-projects">
          <CategoryVisual kind="hardware" />
          <p className="eyebrow">HARDWARE</p>
          <h2>Systems that meet the physical world.</h2>
          <span>
            Explore hardware projects <ArrowRight size={16} />
          </span>
        </Link>
        <Link href="/software-projects">
          <CategoryVisual kind="software" />
          <p className="eyebrow">SOFTWARE</p>
          <h2>Useful tools, shaped around real work.</h2>
          <span>
            Explore software projects <ArrowRight size={16} />
          </span>
        </Link>
      </section>
      <section className="featured">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">FEATURED PROJECTS</p>
            <h2>Start with a direction.</h2>
          </div>
          <Link href="/explore-projects">
            All projects <ArrowRight size={17} />
          </Link>
        </div>
        <div className="projectGrid">
          {[projects[1], projects[10], projects[7]].map((p) => (
            <Card key={p.id} p={p} favs={favs} compare={compare} />
          ))}
        </div>
      </section>
      <section className="process">
        <p className="eyebrow">HOW IT WORKS</p>
        <div>
          {[
            "Explore",
            "Select",
            "Explain requirements",
            "Discuss",
            "Receive a private quotation",
            "Development and delivery",
          ].map((x, i) => (
            <article key={x}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{x}</h3>
            </article>
          ))}
        </div>
      </section>
      <Cta />
      <Reviews compact />
      <section className="faqPreview">
        <div>
          <p className="eyebrow">COMMON QUESTIONS</p>
          <h2>Scope comes before a quotation.</h2>
        </div>
        <div>
          <details>
            <summary>Can a project be customised?</summary>
            <p>
              Yes. Requirements are discussed before a suitable technical
              direction is proposed.
            </p>
          </details>
          <details>
            <summary>How do quotations work?</summary>
            <p>
              Quotations are private and follow a requirements discussion. No
              public project prices are shown.
            </p>
          </details>
          <Link href="/faq">
            View FAQ <ArrowRight size={15} />
          </Link>
        </div>
      </section>
      <section className="contactCta">
        <p className="eyebrow">HAVE A REQUIREMENT?</p>
        <h2>Let’s begin with the problem.</h2>
        <a
          className="primary"
          href={wa(greet)}
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp ZAQVION LABS <MessageCircle size={17} />
        </a>
        <a className="secondary contactEmail" href="mailto:abinesh10sangee07@gmail.com">abinesh10sangee07@gmail.com</a>
      </section>
    </>
  );
}
export function Site({ page }: { page: string }) {
  let content: React.ReactNode;
  if (page === "home") content = <Home />;
  else if (page === "explore-projects") content = <Catalogue />;
  else if (page === "hardware-projects")
    content = <Catalogue initial="Hardware" />;
  else if (page === "software-projects")
    content = <Catalogue initial="Software" />;
  else if (page.startsWith("projects/")) {
    const p = bySlug(page.slice(9));
    content = p ? <Detail p={p} /> : <Info page="missing" />;
  } else if (
    ["recommendations", "project-recommendation-assistant"].includes(page)
  )
    content = <Recommender />;
  else if (["comparison", "project-comparison"].includes(page))
    content = <Comparison />;
  else if (["favourites", "my-favourites"].includes(page))
    content = <Favourites />;
  else if (page === "custom-project-builder")
    content = (
      <section className="builder">
        <p className="eyebrow">CUSTOM PROJECT BUILDER</p>
        <h1>Shape the brief before we talk.</h1>
        <Enquiry />
      </section>
    );
  else if (page === "about-us") content = <About />;
  else if (page === "reviews") content = <Reviews />;
  else content = <Info page={page} />;
  return (
    <>
      <Header />
      <main>{content}</main>
      <a
        className="whatsapp"
        href={wa(greet)}
        target="_blank"
        rel="noreferrer"
        aria-label="Open WhatsApp support"
      >
        <MessageCircle />
        <span>WhatsApp support</span>
      </a>
      <Footer />
    </>
  );
}
