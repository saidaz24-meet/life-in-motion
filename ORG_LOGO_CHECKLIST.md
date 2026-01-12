# Org Logo System - Implementation Checklist

## ✅ Implementation Complete

### 1. Org Registry Created
- **File**: `src/content/orgs.ts`
- **OrgIds defined**: MEET, HUJI, DESY, WEIZMANN, MIT, APPSFLYER, BML
- **ORGS registry**: Maps each OrgId to { id, name, logoSrc, alt }
- **Helper functions**: `getOrgById()`, `getOrgsByIds()`

### 2. Schema Updated
- **File**: `src/content/types.ts`
- **Added**: `orgIds?: OrgId[]` to `ContentItem` interface
- **Kept**: `badges?: Badge[]` for backward compatibility

### 3. Rendering Updated
All badge rendering locations now also render `orgIds`:
- ✅ `src/app/views/HonorsPage.tsx` (timeline cards)
- ✅ `src/app/views/VenturesPage.tsx` (flagship hero + small cards)
- ✅ `src/app/views/AtlasPage.tsx` (mobile list view)
- ✅ `src/components/atlas/AtlasTimelineGrid.tsx` (desktop grid)
- ✅ `src/components/modal/CaseFileModal.tsx` (modal header)

### 4. Validation Added
- **File**: `src/content/validateOrgs.ts`
- **Auto-runs**: In dev mode via `src/content/items/index.ts`
- **Warns**: If orgId is missing from ORGS registry

---

## 📋 Where to Put Logos - Rules

### Use `orgIds` when:
- ✅ The organization has a logo file in `/public/images/logos/`
- ✅ The organization is registered in `src/content/orgs.ts`
- ✅ You want consistent logo rendering across the site

### Use `badges` when:
- ⚠️ You need a text badge (not a logo)
- ⚠️ You need a one-off logo that's not in the registry
- ⚠️ You're migrating legacy content (temporary)

---

## 📁 Naming Convention for Logo Files

**Location**: `/public/images/logos/`

**Format**: Lowercase, hyphenated names matching the OrgId

**Examples**:
- `MEET` → `meet.png` ✅ (exists)
- `HUJI` → `huji.jpg` or `HUJI.jpg` ✅ (exists as `HUJI.jpg`)
- `DESY` → `desy.png` ⚠️ (TODO: add this file)
- `WEIZMANN` → `weizmann.png` ⚠️ (TODO: add this file)
- `MIT` → `mit.png` ✅ (exists)
- `APPSFLYER` → `appsflyer.png` ✅ (exists)
- `BML` → `bml.jpeg` or `better_mind_labs_logo.jpeg` ✅ (exists as `better_mind_labs_logo.jpeg`)

**Current logo files**:
- `appsflyer.png`
- `better_mind_labs_logo.jpeg`
- `HUJI.jpg`
- `meet.png`
- `Meta-Logo.png`
- `mit.png`

**Missing logo files** (referenced in ORGS but not yet added):
- `desy.png` (for DESY)
- `weizmann.png` (for WEIZMANN)

---

## 🚀 How to Add a New Org Safely

### Step-by-Step:

1. **Add logo file** to `/public/images/logos/`
   - Use lowercase, hyphenated name (e.g., `new-org.png`)
   - Recommended formats: PNG (transparent), JPG (opaque), SVG (vector)

2. **Add OrgId to `ORG_IDS` array** in `src/content/orgs.ts`
   ```typescript
   export const ORG_IDS = [
     "MEET",
     "HUJI",
     // ... existing orgs ...
     "NEW_ORG",  // ← Add here
   ] as const;
   ```

3. **Add entry to `ORGS` record** in `src/content/orgs.ts`
   ```typescript
   export const ORGS: Record<OrgId, Org> = {
     // ... existing orgs ...
     NEW_ORG: {
       id: "NEW_ORG",
       name: "New Organization Name",
       logoSrc: "/images/logos/new-org.png",
       alt: "New Organization logo",
     },
   };
   ```

4. **Use in content items** in `src/content/items/all.ts`
   ```typescript
   {
     id: "my-item",
     // ... other fields ...
     orgIds: ["NEW_ORG"],  // ← Add here
   }
   ```

5. **Test in dev mode**
   - Run `npm run dev`
   - Check browser console for validation warnings
   - Verify logo appears correctly on the page

### Validation

The dev-only validator will:
- ✅ Warn if `orgId` is not in `ORG_IDS` array
- ✅ Warn if `orgId` is in array but missing from `ORGS` record
- ✅ Log success message if all orgIds are valid

---

## 🔄 Migration from `badges` to `orgIds`

If you have existing content using `badges` for org logos:

1. **Identify the org** - Check which organization the badge represents
2. **Ensure org is registered** - Add to `src/content/orgs.ts` if needed
3. **Replace badge with orgId**:
   ```typescript
   // Before:
   badges: [
     {
       type: "logo",
       src: "/images/logos/meet.png",
       alt: "MEET logo",
     }
   ]
   
   // After:
   orgIds: ["MEET"]
   ```
4. **Remove old badge** - Delete the `badges` entry (or keep for text badges)
5. **Test** - Verify logo still appears correctly

---

## 📝 Notes

- **De-duping**: Currently, if both `badges` and `orgIds` reference the same org logo, both will render. Consider adding de-duping logic if needed.
- **Backward compatibility**: `badges` are still supported, so existing content won't break.
- **Text badges**: Use `badges` with `type: "text"` for non-logo badges.
- **Logo sizing**: Logos are rendered at consistent height (20px mobile, 22px desktop) with max-width 120px.

---

**Last Updated**: 2025-01-27

