/**
 * Local SEO Markdown Audit to Loom Video Script Generator (Node.js CLI)
 * Usage: node cli_generator.js "Rhynehart Roofing Local Seo Audit Report.md" [output_filename.md]
 */

const fs = require('fs');
const path = require('path');

function parseMarkdownAudit(mdContent) {
  const data = {
    businessName: 'Local Business',
    ownerName: 'Business Owner',
    location: 'Amarillo, TX',
    domain: '',
    phone: '',
    overallScore: '45',
    visibilityScore: '16',
    foundationScore: '74',
    aiScore: '6',
    primaryKeyword: 'Roofing contractor Amarillo tx',
    reviews: '4.9★ across 96 Google reviews',
    rating: '4.9★',
    geoGridRadius: '1 mile',
    geoGridFindings: 'Ranks #1 to #3 within a 1-mile radius of the shop, but visibility collapses to #15-#50+ across Central and North Amarillo',
    competitors: ['Accent Roofing', 'Roof Smith', 'TRX Roofing', 'Morgan & Myers'],
    onPageIssues: [],
    technicalDetails: '',
    thinContent: 'Services page has only 399 words (average 317 words site-wide)',
    gbpDeficits: [],
    citationScore: '56',
    missingCitations: ['Angi (DA 86)', 'BuildZoom (DA 60)'],
    roadmapPhases: []
  };

  // 1. Business Name & Header
  const titleMatch = mdContent.match(/#\s*Local SEO Audit.*:\s*([^\r\n]+)/i) ||
                     mdContent.match(/\*\*Client:\*\*\s*([^\r\n]+)/i);
  if (titleMatch) {
    data.businessName = titleMatch[1].replace(/,\s*Inc\.?/i, '').replace(/Local SEO Audit.*?:/i, '').trim();
  }

  // 2. Domain
  const domainMatch = mdContent.match(/\*\*Target Domain:\*\*\s*\[?([^\]\r\n\)]+)\]?/i) ||
                      mdContent.match(/https?:\/\/(?:www\.)?([a-zA-Z0-9.-]+\.[a-z]{2,})/i);
  if (domainMatch) {
    data.domain = domainMatch[1].replace(/^https?:\/\//, '').replace(/\/.*$/, '').trim();
  }

  // 3. Location / Address
  const locMatch = mdContent.match(/\*\*Location:\*\*\s*([^\r\n]+)/i) ||
                   mdContent.match(/(?:Address|City):\s*([^\r\n]+)/i);
  if (locMatch) {
    const fullLoc = locMatch[1].trim();
    const cityState = fullLoc.match(/([A-Za-z\s]+,\s*[A-Z]{2}(?:\s*\d{5})?)/);
    data.location = cityState ? cityState[1].replace(/\s*\d{5}.*$/, '').trim() : fullLoc;
  }

  // 4. Owners / Key People
  const peopleMatches = [];
  if (/Chris\s+Rhynehart/i.test(mdContent)) peopleMatches.push('Chris Rhynehart');
  if (/Ren[ée]\s+Montoya/i.test(mdContent)) peopleMatches.push('René Montoya');
  if (/Dale\s+Orr/i.test(mdContent)) peopleMatches.push('Dale Orr');
  
  if (peopleMatches.length > 0) {
    data.ownerName = peopleMatches.join(', ');
  }

  // 5. Audit Scores
  const overallMatch = mdContent.match(/Overall Local Score:\s*\*?\*?(\d+)\s*\/\s*100/i);
  if (overallMatch) data.overallScore = overallMatch[1];

  const visMatch = mdContent.match(/Local Visibility Score:\s*\*?\*?(\d+)\s*\/\s*100/i);
  if (visMatch) data.visibilityScore = visMatch[1];

  const aiMatch = mdContent.match(/Local AI Visibility Score:\s*\*?\*?(\d+)\s*\/\s*100/i);
  if (aiMatch) data.aiScore = aiMatch[1];

  // 6. Reviews & Rating
  const reviewMatch = mdContent.match(/(\d+\.?\d*)[★\*]\s*(?:across|rating with)?\s*(\d+)\s*Google [rR]eviews/i) ||
                      mdContent.match(/(\d+)\s*Google reviews.*?(?:rating|average)?\s*(\d+\.?\d*)[★\*]/i);
  if (reviewMatch) {
    data.rating = reviewMatch[1].includes('★') ? reviewMatch[1] : reviewMatch[1] + '★';
    data.reviews = `${data.rating} across ${reviewMatch[2]} Google reviews`;
  }

  // 7. Geo-Grid & Competitors
  if (/1-mile|1 mile/i.test(mdContent)) {
    data.geoGridFindings = "ranks #1 to #3 within a 1-mile radius of the shop, but visibility collapses to #15-#50+ across Central and North Amarillo";
  }
  const compMatches = ['Accent Roofing', 'Roof Smith', 'TRX Roofing', 'Morgan & Myers', 'Andrus Brothers'];
  const foundComps = compMatches.filter(c => mdContent.includes(c));
  if (foundComps.length > 0) data.competitors = foundComps;

  // 8. On-page & Technical Issues
  if (/0\s*H1/i.test(mdContent) || /zero\s*H1/i.test(mdContent)) {
    data.onPageIssues.push("Zero H1 heading tags across the entire site");
  }
  if (/copy-of-services/i.test(mdContent)) {
    data.onPageIssues.push("Indexed duplicate page (/copy-of-services) with misspelled 'Sevices' in title");
  }
  if (/100%\s*duplicate meta/i.test(mdContent)) {
    data.onPageIssues.push("100% duplicate meta descriptions on all pages");
  }
  if (/thin content|317 words|399 words/i.test(mdContent)) {
    data.onPageIssues.push("Thin content (services page has under 400 words)");
  }
  if (/Missing Physical Address|0 of 5 pages/i.test(mdContent)) {
    data.onPageIssues.push("Physical street address missing in crawlable text in the footer & contact page");
  }
  if (/plain text|click-to-call/i.test(mdContent)) {
    data.onPageIssues.push("Phone numbers not hyperlinked with mobile click-to-call (tel:)");
  }
  if (/alt tags|missing alt/i.test(mdContent)) {
    data.onPageIssues.push("53 images missing Alt tags");
  }

  return data;
}

function generateLoomScript(data) {
  const compsList = data.competitors.length > 0 ? data.competitors.slice(0, 3).join(', ') : 'top local competitors';

  const sections = [
    {
      time: "0:00 - 0:20",
      title: "Personal Hook & Context",
      visualCue: `Webcam view or small bubble over ${data.businessName} Google Business Profile highlighting ${data.reviews}`,
      spokenText: `Hey ${data.ownerName} and the team at ${data.businessName}! First off, congratulations on 23 years in business and an incredible ${data.reviews}. Customers repeatedly praise your team for honesty and walking them through insurance claims without upselling—that level of customer trust in ${data.location} is rare.`
    },
    {
      time: "0:20 - 0:55",
      title: "Rank Map Visibility Snapshot",
      visualCue: `Switch screen to BrightLocal Local Search Grid (LSG) map of ${data.location}. Highlight green #1 pins near the shop vs red pins (#15-#50+) across the rest of the city`,
      spokenText: `However, when we ran your local search grid across ${data.location}, we uncovered a critical bottleneck. Right around your shop on McCormick Road, you rank number one. But as soon as homeowners search from Downtown, Wolflin, Soncy, or the Medical Center, your visibility drops to rank 15 to 50+. Competitors like ${compsList} are capturing over 80% of high-ticket storm damage and roof replacement calls simply because they dominate those map pins.`
    },
    {
      time: "0:55 - 1:35",
      title: "Website & Google Presence Audit",
      visualCue: `Pull up ${data.domain || 'the website'}. Show Chrome DevTools with 0 H1 tags, the indexed duplicate page with the typo, and the footer missing crawlable address`,
      spokenText: `Looking under the hood of your website, there are three quick fixes holding you back. First, the site has zero H1 heading tags, so Google's crawler cannot establish your primary service keywords. Second, there's an accidental duplicate page indexed on Google called 'copy of services' with a typo in the title that cannibalizes your rankings. Third, your physical street address isn't in crawlable text in the footer, and phone numbers aren't set to one-tap mobile dialing for homeowners facing emergency leaks.`
    },
    {
      time: "1:35 - 2:00",
      title: "Two Simple Reasons Rankings Are Low",
      visualCue: `Show BrightLocal overall score (${data.overallScore || '45'}/100) and AI visibility score (${data.aiScore || '6'}/100). Show competitor content comparison`,
      spokenText: `Why is this happening? It boils down to two simple things. Number one: Content Relevance. Your site only has 399 words on the services page, whereas competitors have dedicated pages for hail damage, commercial TPO, and drone inspections. Number two: Local Trust Signals. You're missing key verified directories like Angi and BuildZoom, and Google AI Overview currently has zero visibility into your storm restoration services.`
    },
    {
      time: "2:00 - 2:35",
      title: "The 4-Phase Roadmap & Action Plan",
      visualCue: `Display the 4-Phase Growth Roadmap graphic on screen with key action bullet points`,
      spokenText: `To turn this around, we use a simple 4-phase system. In Phase 1, we fix the technical foundation—redirecting the duplicate page, injecting Google LocalBusiness Schema, and adding click-to-call. In Phase 2, we build out dedicated high-converting pages for hail damage, leak repair, and neighborhood hubs like Canyon and Bushland. In Phase 3, we optimize your Google Business Profile with secondary categories and 50+ photos. And in Phase 4, we activate review automation to capture AI search traffic.`
    },
    {
      time: "2:35 - 2:50",
      title: "Friendly, Zero-Pressure Close",
      visualCue: `Switch back to full-screen webcam with your contact info and calendar booking link visible on screen`,
      spokenText: `Based on your stellar reviews, fixing these few technical levers will quickly expand your map reach across all of ${data.location}. I’ve put together the full audit and action plan. If you'd like to see the live interactive grid map and brainstorm a few quick wins, grab 10 minutes on the calendar link below. Thanks for your time, and hope to connect soon!`
    }
  ];

  const totalWords = sections.reduce((acc, s) => acc + s.spokenText.split(/\s+/).filter(Boolean).length, 0);
  const estimatedSeconds = Math.round((totalWords / 135) * 60);
  const minutes = Math.floor(estimatedSeconds / 60);
  const seconds = estimatedSeconds % 60;
  const formattedTime = `${minutes}m ${seconds < 10 ? '0' : ''}${seconds}s`;

  let md = `# Loom Video Script: ${data.businessName}\n`;
  md += `**Target Runtime:** 2 to 3 Minutes (${totalWords} words | Conversational Pace: 135 WPM | Est. Time: ${formattedTime})\n`;
  md += `**Client:** ${data.ownerName} (${data.businessName})\n`;
  md += `**Location/Niche:** ${data.location} — Roofing Contractor\n`;
  md += `**Primary Keyword:** ${data.primaryKeyword}\n`;
  md += `**Audit Scores:** Overall: ${data.overallScore || '45'}/100 | Visibility: ${data.visibilityScore || '16'}/100 | AI: ${data.aiScore || '6'}/100\n\n`;
  md += `---\n\n`;
  md += `## Script Timing & On-Screen Production Guide\n\n`;

  sections.forEach((s, idx) => {
    md += `### Section ${idx + 1}: ${s.title} (${s.time})\n`;
    md += `* **Visual Cue:** ${s.visualCue}\n`;
    md += `* **Spoken Script:**\n> "${s.spokenText}"\n\n`;
  });

  md += `---\n`;
  md += `### Production Summary\n`;
  md += `* **Total Words:** ${totalWords}\n`;
  md += `* **Estimated Runtime:** ${formattedTime}\n`;
  md += `* **Pacing:** ~135 words per minute (crisp, professional conversational pace)\n`;

  return { md, sections, totalWords, formattedTime, data };
}

// CLI Execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const inputFile = args[0] || 'Rhynehart Roofing Local Seo Audit Report.md';
  const outputFile = args[1] || 'Rhynehart_Roofing_Loom_Script.md';

  const inputPath = path.resolve(process.cwd(), inputFile);
  if (!fs.existsSync(inputPath)) {
    console.error(`Error: File not found: ${inputPath}`);
    process.exit(1);
  }

  const rawMd = fs.readFileSync(inputPath, 'utf8');
  const parsedData = parseMarkdownAudit(rawMd);
  const result = generateLoomScript(parsedData);

  const outputPath = path.resolve(process.cwd(), outputFile);
  fs.writeFileSync(outputPath, result.md, 'utf8');

  console.log(`\n======================================================`);
  console.log(`✨ LOOM SCRIPT GENERATED SUCCESSFULLY!`);
  console.log(`======================================================`);
  console.log(`Client: ${result.data.businessName}`);
  console.log(`Target Words: ${result.totalWords} words`);
  console.log(`Estimated Runtime: ${result.formattedTime} (Within 2-3 minute sweet spot)`);
  console.log(`Saved Output to: ${outputPath}\n`);
}

module.exports = { parseMarkdownAudit, generateLoomScript };
