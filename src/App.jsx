import { useState } from 'react'
import learningCurves from './assets/learning_curves.png'
import diagramImg from './assets/diagram.png'
import paperPDF from './CSE493SReportFinal.pdf'

const PAPER_URL = paperPDF
const CODE_URL = 'https://github.com/akshaisrin/SimToRealDuck.git'

const authors = [
  { name: 'Akshai Srinivasan', email: 'akshsrin@cs.washington.edu' },
  { name: 'Neel Sirivara', email: 'nsiriv@cs.washington.edu' },
]

const resultsRows = [
  { policy: 'Baseline', dr: 'Baseline', extrinsics: false, reward: '~106' },
  { policy: 'Moderate DR', dr: 'Moderate', extrinsics: false, reward: '~88' },
  { policy: 'Aggressive DR', dr: 'Aggressive', extrinsics: false, reward: '~26' },
  { policy: 'RMA', dr: 'Moderate', extrinsics: true, reward: '~99', best: true },
]

const drParams = [
  { label: 'floor friction',   baseline: '(0.5, 1.0)',    moderate: '(0.3, 1.3)' },
  { label: 'kp scale',         baseline: '(0.9, 1.1)',    moderate: '(0.75, 1.25)' },
  { label: 'mass scale',       baseline: '(0.9, 1.1)',    moderate: '(0.75, 1.25)' },
  { label: 'kf scale',         baseline: '(0.9, 1.1)',    moderate: '(0.75, 1.25)' },
  { label: 'ka scale',         baseline: '(1.0, 1.05)',   moderate: '(0.8, 1.2)' },
  { label: 'CoM jitter (m)',   baseline: '0.05',          moderate: '0.10' },
]

const comparisons = [
  {
    condition: 'mass_scale = 2.0',
    note: 'Both policies trained with mass_scale in [0.75, 1.25]. Evaluated at 2x nominal body mass.',
    rmaSrc: 'videos/rma_mass20.mp4',
    baseSrc: 'videos/nonadaptive_mass20.mp4',
  },
  {
    condition: 'kp_scale = 0.5',
    note: 'Motor gain halved. Policy must compensate for weaker actuators with no retraining.',
    rmaSrc: 'videos/rma_kp.mp4',
    baseSrc: 'videos/nonadaptive_kp.mp4',
  },
  {
    condition: 'push_magnitude = 0.8',
    note: 'Lateral impulse applied mid-episode.',
    rmaSrc: 'videos/rma_push.mp4',
    baseSrc: 'videos/nonadaptive_push.mp4',
  },
]

const bibtex = `@misc{srinivasan2026simtoreal,
  title  = {Sim-to-Real Reinforcement Learning for
            Physics-Based Bipedal Character Control},
  author = {Srinivasan, Akshai and Sirivara, Neel},
  year   = {2026},
  note   = {CSE 493S, University of Washington}
}`

// ── Math rendering ────────────────────────────────────────────────────────────

function M({ children, display = false }) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    trust: false,
  })
  return <span dangerouslySetInnerHTML={{ __html: html }} />
}

function Eq({ children }) {
  return (
    <div className="my-4 py-3 px-5 rounded-lg overflow-x-auto text-center"
      style={{ background: '#f8f8ff', border: '1px solid #e0e0f0' }}>
      <M display>{children}</M>
    </div>
  )
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function NavBar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200"
      style={{ fontFamily: 'var(--font-display)', background: '#f1f5f9' }}>
      <div className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 tracking-widest uppercase">
          Srinivasan & Sirivara · UW 2026
        </span>
        <div className="flex gap-6">
          {['Abstract', 'Methodology', 'Results', 'References', 'Citation'].map(s => (
            <a key={s} href={`#${s.toLowerCase()}`}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
              {s}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="bg-white border-b border-zinc-100">
      <div className="max-w-4xl mx-auto px-6 pt-20 pb-14 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold text-zinc-900 leading-[1.1] tracking-tight mb-4"
          style={{ fontFamily: 'var(--font-display)' }}>
          Sim-to-Real Reinforcement Learning for Physics-Based Bipedal Character Control
        </h1>

        <p className="text-lg text-zinc-400 mb-10 max-w-lg mx-auto">
          Rapid Motor Adaptation on OpenDuck-Mini, based on Disney Research's BDX bipedal robot
        </p>

        <div className="flex flex-wrap justify-center gap-8 mb-10">
          {authors.map(a => (
            <div key={a.email} className="text-center">
              <p className="font-semibold text-zinc-800 text-base" style={{ fontFamily: 'var(--font-display)' }}>
                {a.name}
              </p>
              <a href={`mailto:${a.email}`}
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}>
                {a.email}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <a href={PAPER_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-white text-sm font-semibold rounded-lg hover:bg-zinc-700 transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}>
            <IconDoc /> Paper
          </a>
          <a href={CODE_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-zinc-200 text-zinc-700 text-sm font-semibold rounded-lg hover:border-zinc-400 hover:text-zinc-900 transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}>
            <IconGitHub /> Code
          </a>
        </div>

        <div className="rounded-xl overflow-hidden border border-zinc-200 shadow-lg">
          <video src="videos/rma_flat.mp4" autoPlay muted loop playsInline
            className="w-full block aspect-video bg-zinc-100" />
        </div>
        <p className="text-xs text-zinc-400 mt-3" style={{ fontFamily: 'var(--font-mono)' }}>
          RMA policy, flat terrain, reward ~99
        </p>
      </div>
    </section>
  )
}

// ── Abstract ──────────────────────────────────────────────────────────────────

function Abstract() {
  return (
    <section id="abstract" className="bg-white border-b border-zinc-100 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionLabel>Abstract</SectionLabel>
        <div className="space-y-4 text-zinc-600 leading-relaxed text-[1.05rem]">
          <p>
            We present two contributions toward understanding sim-to-real transfer in bipedal
            locomotion. First, we survey a line of work on physics-based character control,
            tracing the progression from explicit motion imitation in DeepMimic (2018) through
            adversarial style learning in AMP (2021) to real-world deployment on bipedal hardware
            in Disney BDX (2025) and Olaf (2025). Second, we empirically investigate whether
            adaptive dynamics conditioning via Rapid Motor Adaptation (RMA) improves robustness
            over standard domain randomization on the OpenDuck-Mini platform, an open-source
            bipedal robot derived from Disney's BDX character.
          </p>
          <p>
            We train three policies sequentially: a baseline walking policy under light domain
            randomization, a non-adaptive policy fine-tuned under moderate domain randomization,
            and an RMA policy that conditions on a 3-dim extrinsics vector encoding floor
            friction, actuator gain, and torso mass. Evaluating under dynamics perturbations
            that exceed the training distribution, the RMA policy achieves an 11-point reward
            improvement over the non-adaptive baseline and survives all three perturbation
            conditions, while the non-adaptive policy fails under all three. These results
            support the conclusion that domain randomization is necessary but not sufficient
            for robust sim-to-real transfer.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Method ────────────────────────────────────────────────────────────────────

function TrainingDiagram() {
  return (
    <img src={diagramImg} alt="RMA PPO training loop" className="w-full block" />
  )
}


function Method() {
  return (
    <section id="methodology" className="bg-zinc-50 border-b border-zinc-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionLabel>Methodology</SectionLabel>

        <p className="text-zinc-600 leading-relaxed text-[1.05rem] mb-10">
          We train three policies sequentially. The baseline is trained from scratch under
          light domain randomization. The non-adaptive policy is fine-tuned from the baseline
          under a wider randomization range; it sees more dynamics variation during training
          but has no signal about which dynamics it is currently in at inference time. The RMA
          policy trains under the same two-stage curriculum, but the observation is augmented
          with a 3-dim extrinsics vector read directly from the simulator each step. No
          additional sensing hardware is required.
        </p>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-12">
          <TrainingDiagram />
        </div>

        <div className="mb-12">
          <h3 className="text-base font-semibold text-zinc-800 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            Domain Randomization Ranges
          </h3>
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f4f4f5' }}>
                  <th className="text-left py-3 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-400"
                    style={{ fontFamily: 'var(--font-display)' }}>Parameter</th>
                  <th className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center"
                    style={{ fontFamily: 'var(--font-display)' }}>Baseline DR</th>
                  <th className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-indigo-400 text-center"
                    style={{ fontFamily: 'var(--font-display)' }}>Moderate DR</th>
                </tr>
              </thead>
              <tbody>
                {drParams.map((row, i) => (
                  <tr key={i} style={{ borderBottom: i < drParams.length - 1 ? '1px solid #f4f4f5' : 'none' }}
                    className="hover:bg-zinc-50 transition-colors">
                    <td className="py-3 px-5 text-zinc-700 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                      {row.label}
                    </td>
                    <td className="py-3 px-5 text-center text-zinc-500 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                      {row.baseline}
                    </td>
                    <td className="py-3 px-5 text-center text-indigo-700 text-sm" style={{ fontFamily: 'var(--font-mono)' }}>
                      {row.moderate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 className="text-base font-semibold text-zinc-800 mb-4"
            style={{ fontFamily: 'var(--font-display)' }}>
            Training Curriculum
          </h3>
          <p className="text-zinc-600 leading-relaxed text-[1.05rem]">
            Phase 1 trains from scratch under baseline domain randomization for 300M steps, establishing a stable
            walking gait before the policy is exposed to wider dynamics variation. Phase 2
            fine-tunes from that checkpoint under moderate domain randomization for 150M steps. Starting from
            Phase 1 is critical; training directly under moderate domain randomization from scratch is
            significantly harder, as the policy must simultaneously learn to walk and handle
            a wide range of dynamics without any prior locomotion knowledge. The two-stage
            approach decouples these problems: learn to walk first, then learn to be robust.
            Phase 3 (future work) replaces the ground-truth extrinsics with predictions from
            an LSTM trained on state-action history, enabling deployment on real hardware
            without simulator access at inference time.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Results ───────────────────────────────────────────────────────────────────

const survivalRows = [
  { condition: 'mass_scale = 2.0', note: 'Beyond training distribution [0.75, 1.25]', rma: true, nonadaptive: false },
  { condition: 'kp_scale = 0.5',   note: 'Beyond training distribution [0.75, 1.25]', rma: true, nonadaptive: false },
  { condition: 'push = 0.8',       note: 'Lateral impulse, mid-episode',              rma: true, nonadaptive: false },
]

function Tick({ pass }) {
  return pass ? (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      survives
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
      fails
    </span>
  )
}

function SurvivalTable() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mb-10">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f4f4f5' }}>
            <th className="text-left py-3 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-400"
              style={{ fontFamily: 'var(--font-display)' }}>Condition</th>
            <th className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-400 text-center"
              style={{ fontFamily: 'var(--font-display)' }}>Non-Adaptive</th>
            <th className="py-3 px-5 text-xs font-semibold uppercase tracking-wider text-indigo-500 text-center"
              style={{ fontFamily: 'var(--font-display)' }}>RMA</th>
          </tr>
        </thead>
        <tbody>
          {survivalRows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < survivalRows.length - 1 ? '1px solid #f4f4f5' : 'none' }}>
              <td className="py-3.5 px-5">
                <p className="font-medium text-zinc-800" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{r.condition}</p>
                <p className="text-xs text-zinc-400 mt-0.5">{r.note}</p>
              </td>
              <td className="py-3.5 px-5 text-center"><Tick pass={r.nonadaptive} /></td>
              <td className="py-3.5 px-5 text-center"><Tick pass={r.rma} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function RewardTable() {
  return (
    <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden mb-10">
      <table className="w-full text-sm" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #f4f4f5' }}>
            {['Policy', 'DR', 'Extrinsics', 'Reward'].map(h => (
              <th key={h} className="text-left py-3 px-5 text-xs font-semibold uppercase tracking-wider text-zinc-400"
                style={{ fontFamily: 'var(--font-display)' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {resultsRows.map((r, i) => (
            <tr key={i} style={{ borderBottom: i < resultsRows.length - 1 ? '1px solid #f4f4f5' : 'none', background: r.best ? '#eef2ff' : 'transparent' }}>
              <td className="py-3.5 px-5 font-semibold text-zinc-800" style={{ fontFamily: 'var(--font-display)' }}>
                {r.policy}
                {r.best && <span className="ml-2 text-[10px] bg-indigo-100 text-indigo-600 font-bold px-1.5 py-0.5 rounded uppercase tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>best</span>}
              </td>
              <td className="py-3.5 px-5 text-zinc-500">{r.dr}</td>
              <td className="py-3.5 px-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${r.extrinsics ? 'bg-indigo-100 text-indigo-700' : 'bg-zinc-100 text-zinc-500'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                  {r.extrinsics ? 'yes' : 'no'}
                </span>
              </td>
              <td className={`py-3.5 px-5 font-semibold ${r.best ? 'text-indigo-700' : 'text-zinc-600'}`} style={{ fontFamily: 'var(--font-mono)' }}>
                {r.reward}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function VideoPair({ condition, note, rmaSrc, baseSrc }) {
  return (
    <div className="mb-12">
      <div className="mb-4">
        <p className="font-medium text-zinc-800 mb-0.5" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>{condition}</p>
        <p className="text-sm text-zinc-400">{note}</p>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <div className="rounded-xl overflow-hidden border border-indigo-200/60 shadow-sm">
            <video src={rmaSrc} autoPlay muted loop playsInline className="w-full block aspect-video bg-zinc-100" />
          </div>
          <p className="text-xs text-center mt-2 font-semibold text-indigo-600" style={{ fontFamily: 'var(--font-display)' }}>RMA (survives)</p>
        </div>
        <div>
          <div className="rounded-xl overflow-hidden border border-red-200/60 shadow-sm">
            <video src={baseSrc} autoPlay muted loop playsInline className="w-full block aspect-video bg-zinc-100" />
          </div>
          <p className="text-xs text-center mt-2 font-semibold text-red-500" style={{ fontFamily: 'var(--font-display)' }}>Non-Adaptive (fails)</p>
        </div>
      </div>
    </div>
  )
}

function Results() {
  return (
    <section id="results" className="bg-white border-b border-zinc-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionLabel>Results</SectionLabel>

        {/* Takeaway callout */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 px-6 py-5 mb-10">
          <p className="text-indigo-900 leading-relaxed text-[1.05rem]">
            RMA achieves an <strong>11-point reward improvement</strong> (99 vs. 88) and survives
            all three out-of-distribution perturbations. The non-adaptive policy fails under all three,
            despite training under the same domain randomization.
          </p>
        </div>

        {/* Learning curves */}
        <h3 className="text-base font-semibold text-zinc-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Learning Curves
        </h3>
        <div className="rounded-xl overflow-hidden border border-zinc-200 mb-2">
          <img src={learningCurves} alt="Learning curves: RMA vs non-adaptive policy" className="w-full block" />
        </div>
        <p className="text-xs text-zinc-400 mb-10 leading-relaxed">
          RMA (blue) and non-adaptive (orange) episodic reward over training.
          The drop at step 300M is the Phase 2 transition to moderate DR; the RMA policy
          recovers and ultimately converges higher.
        </p>

        {/* Survival table */}
        <h3 className="text-base font-semibold text-zinc-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Survival Under Perturbation
        </h3>
        <SurvivalTable />

        {/* Video comparisons */}
        <h3 className="text-base font-semibold text-zinc-800 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Qualitative Comparisons
        </h3>
        <p className="text-sm text-zinc-400 mb-8">
          Perturbation values are at or beyond the edge of the moderate DR training distribution.
        </p>
        {comparisons.map((c, i) => <VideoPair key={i} {...c} />)}

        {/* Morphological placeholder */}
        <h3 className="text-base font-semibold text-zinc-800 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          Morphological Stress Test
        </h3>
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-8 text-center">
          <p className="text-sm font-medium text-zinc-500 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
            Results pending
          </p>
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md mx-auto">
            Systematic modifications to link masses, foot geometry, and center-of-mass position to
            probe the limits of transfer under morphological mismatch, analogous to the challenges
            documented in Olaf.
          </p>
        </div>
      </div>
    </section>
  )
}

// ── Citation ──────────────────────────────────────────────────────────────────

function Citation() {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(bibtex)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <section id="citation" className="bg-zinc-50 border-b border-zinc-100 py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionLabel>Citation</SectionLabel>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-100 bg-zinc-50">
            <span className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-mono)' }}>BibTeX</span>
            <button onClick={copy}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}>
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <pre className="px-6 py-5 text-sm text-zinc-600 overflow-x-auto leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)' }}>
            {bibtex}
          </pre>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────

function References() {
  const refs = [
    {
      label: 'DeepMimic (2018)',
      authors: 'Peng et al.',
      title: 'DeepMimic: Example-Guided Deep Reinforcement Learning of Physics-Based Character Skills',
      venue: 'SIGGRAPH 2018',
      url: 'https://arxiv.org/abs/1804.02717',
    },
    {
      label: 'RMA (2021)',
      authors: 'Kumar et al.',
      title: 'RMA: Rapid Motor Adaptation for Legged Robots',
      venue: 'RSS 2021',
      url: 'https://arxiv.org/abs/2107.04034',
    },
    {
      label: 'AMP (2021)',
      authors: 'Peng et al.',
      title: 'AMP: Adversarial Motion Priors for Stylized Physics-Based Character Control',
      venue: 'SIGGRAPH 2021',
      url: 'https://arxiv.org/abs/2104.02180',
    },
    {
      label: 'AMP in the Real World (2022)',
      authors: 'Escontrela et al.',
      title: 'Adversarial Motion Priors Make Good Substitutes for Complex Reward Functions',
      venue: 'IROS 2022',
      url: 'https://xbpeng.github.io/projects/AMP_Locomotion',
    },
    {
      label: 'BDX (2025)',
      authors: 'Varin et al.',
      title: 'Design and Control of a Bipedal Robotic Character',
      venue: 'RSS 2025',
      url: 'https://arxiv.org/abs/2501.05204',
    },
    {
      label: 'Olaf (2025)',
      authors: 'Girard et al.',
      title: 'Olaf: A Morphologically Adaptive Bipedal Locomotion Policy',
      venue: 'arXiv 2025',
      url: 'https://arxiv.org/abs/2512.16705',
    },
  ]

  return (
    <section id="references" className="bg-white border-b border-zinc-100 py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <SectionLabel>References</SectionLabel>
        <ol className="space-y-4">
          {refs.map((r, i) => (
            <li key={i} className="flex gap-4 text-sm leading-relaxed">
              <span className="shrink-0 w-6 text-zinc-400 text-right" style={{ fontFamily: 'var(--font-mono)' }}>
                [{i + 1}]
              </span>
              <span className="text-zinc-600">
                <span className="font-semibold text-zinc-800">{r.authors}</span>{' '}
                <a href={r.url} target="_blank" rel="noreferrer"
                  className="text-zinc-800 hover:text-indigo-600 transition-colors">
                  {r.title}.
                </a>{' '}
                <span className="text-zinc-400" style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{r.venue}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-zinc-50 py-8 px-6 text-center">
      <p className="text-xs text-zinc-400" style={{ fontFamily: 'var(--font-mono)' }}>
        CSE 493S · University of Washington · 2026
      </p>
    </footer>
  )
}

// ── Shared ────────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold mb-3"
        style={{ fontFamily: 'var(--font-display)', color: '#18181b' }}>
        {children}
      </h2>
      <div className="h-px bg-zinc-200" />
    </div>
  )
}

function IconDoc() {
  return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
    <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/>
  </svg>
}

function IconGitHub() {
  return <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.936.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <Hero />
      <Abstract />
      <Method />
      <Results />
      <References />
      <Citation />
      <Footer />
    </div>
  )
}
