# UBID-X Product Prototype

UBID-X is an explainable Unique Business Identifier and Active Business Intelligence prototype for Karnataka Commerce and Industry Theme 1.

The prototype is built as a multi-tab React product surface, not a static slide. It shows how fragmented department records become defendable UBIDs, how medium-confidence matches go through human review, and how activity events classify businesses as Active, Dormant, or Closed.

## Tabs

- Mission Control: executive story, decision bands, coverage, and district activity picture.
- UBID Generator: raw records, standardisation, candidate matches, confidence scores, and explanations.
- Review Queue: human-in-the-loop approve/reject flow for risky matches.
- Activity Intel: Active/Dormant/Closed classifier plus unmatched event handling.
- Analytics: policy queries built on UBIDs.
- Architecture: deployable system design and risk controls.
- Product Guide: operator workflows for using the prototype end to end.

## Run Locally

```bash
npm install
npm run dev
```

Open `http://127.0.0.1:5173`.

## Build

```bash
npm run build
```

## Product Walkthrough

1. Start on Mission Control to understand source coverage, confidence bands, and the operating picture.
2. Open UBID Generator and inspect the Bengaluru Precision Components match evidence.
3. Open Review Queue and approve or reject a medium-confidence case using the evidence panel.
4. Open Activity Intel and click Unmatched to confirm no source event disappears.
5. Open Analytics and run a policy query such as active in GST but missing in Industries.

## Product Promise

UBID-X is not just record linkage. It is a trusted operating picture of Karnataka's business ecosystem.
