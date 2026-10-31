// Delivered by Originkit · stack: nextjs · styling: tailwind
/* eslint-disable */
// @ts-nocheck
"use client"
import KeycapWall from "@/components/originkit/ui/faq-01/keycap-wall";
import KeycapButton from "@/components/originkit/ui/faq-01/keycap-button";

export function SectionFaq() {
  return (
    <div className="faq-01">
    <section className="faq">
      <div className="side">
        <p className="eyebrow">
          <kbd>?</kbd> Before you solder
        </p>
        <h2>Questions we get at the workbench.</h2>
        <p>
          Everything about the Thock 65 kit and the Oat & Ink keycap set. If yours isn't here, ask
          the people who machine the cases.
        </p>
        <figure className="set" style={{ margin: "0" }}>
          <div id="wall" aria-label="The Oat and Ink keycap set">
            <KeycapWall
              background="#161513"
              baseColor="#2A2826"
              accentColor="#E9E1D2"
              lightKeys={42}
              font={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 500, fontSize: 22 }}
              size={48}
              gap={6}
              rounded={18}
              speed={22}
              hover={60}
              keys={{ tall: 4, texture: 100, presses: 30 }}
              style={{ width: "100%", height: "100%", minWidth: 0, minHeight: 0 }}
            />
          </div>
          <figcaption>Oat & Ink · PBT doubleshot · 142 keys</figcaption>
        </figure>
        <div className="ask">
          <div id="askKey">
            <KeycapButton
              label="ASK"
              font={{
                fontFamily: '"JetBrains Mono", monospace',
                fontWeight: 500,
                fontSize: "18px",
                letterSpacing: "0.08em",
              }}
              colors={{ fill: "#D9653B", textColor: "#FFF6EC", hoverTextColor: "#FFFFFF" }}
              prism={{ color: "#FF8A5B", float: 8, intensity: 90, thickness: 14, hoverFloat: 6 }}
              padding="16px 30px 16px 30px"
              rounded={30}
              camera={{ tilt: 45, rotate: -35 }}
              link="#"
              newTab={false}
              style={{ minWidth: 0, minHeight: 0 }}
            />
          </div>
          <p>
            <b>Ask the workshop</b>A person replies within a day, usually Mara or Jun.
          </p>
        </div>
      </div>
      <div className="list">
        <details name="faq" open>
          <summary>
            Do I need to solder anything?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              No. The Thock 65 PCB is hot-swap, so switches press straight into sockets. If you can
              push a Lego brick in, you can build it. Most people finish in about 40 minutes.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            Which switches should I pick?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              For the deep "thock" in our videos, pick linear switches at 62 g. They come
              factory-lubed, so the case and foam do the rest. If you like a bump, the tactile
              option has a rounded one you'll feel but won't hear across the room.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            Will Oat & Ink fit my current keyboard?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              Almost certainly. It's Cherry profile with 142 keys, covering ANSI and ISO layouts
              from 60% to full size, plus a split spacebar kit. If your board uses MX-style stems,
              it fits.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            Will the legends wear off?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              No. They're doubleshot: two plastics moulded together, so the legend goes all the way
              through the cap. Years of use will polish your <kbd>Space</kbd> a little. It won't
              erase your <kbd>E</kbd>.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            How long does shipping take?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              In-stock kits leave our Rotterdam workshop within two working days. EU orders arrive
              in 2–4 days, UK and US in 4–7. You get a tracking link and a photo of your case before
              it's boxed.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            Can I return a built keyboard?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              Yes, within 30 days, built or not. Pop the switches back in their bag and we'll refund
              the lot. We just ask that the case isn't scratched.
            </p>
          </div>
        </details>
        <details name="faq">
          <summary>
            Is there a warranty on the case and PCB?
            <span className="cap" aria-hidden="true" />
          </summary>
          <div className="answer">
            <p>
              Two years on the PCB and lifetime on the aluminium case. If a socket fails we send a
              new board, not a soldering iron.
            </p>
          </div>
        </details>
      </div>
    </section>
    </div>
  );
}
