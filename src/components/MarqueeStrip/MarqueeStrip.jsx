export default function MarqueeStrip() {
  const items = ['Web3 Raids', 'NFT Whitelists', 'GTD Allocations', 'Alpha Calls', 'Community Growth', 'Engagement', 'FCFS Drops', 'Strategic Support'];
  return (
    <section className="relative py-6 border-y border-base overflow-hidden" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(10px)' }}>
      <div className="marquee whitespace-nowrap font-display text-sm tracking-[0.4em] text-white font-black uppercase flex gap-16">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-16 pr-16" aria-hidden={k === 1}>
            {items.map((t) => <span key={t}>{t}</span>)}
          </div>
        ))}
      </div>
    </section>
  );
}
