# TODO - Inherit “few functionalities” from School_ERP into University_ERP (role-based)

## Step 1: Map role + usecase coverage in University_ERP
- [x] Read role routing: `src/navigation/RootNavigator.tsx`
- [x] Read role helper: `src/hooks/useRole.ts`
- [x] Confirm role enum in `src/types/index.ts`

## Step 2: Identify how backend represents role-specific tabs/permissions
- [x] Read Django models: `backend/api/models.py` (RoleTabMapping)
- [x] Read backend serializers/views: `backend/api/serializers.py`, `backend/api/views/common.py`, `backend/api/views/faculty.py`

## Step 3: Choose the minimal “inherit” subset
- [x] Port role-tab/menu configuration concept using `RoleTabMapping` model (backend already supports filtering by `role`).
  - Next: wire front-end tab/menu renderer to fetch mapping for the logged-in user role.

- [ ] Port workflow: Leave/OD-style approvals handling using the existing `useStore` approval engine.
- [ ] Port targeted messaging as a role-aware feature (Admin approvals desk/analytics messaging).
- [ ] Port timetable auto-generate / bulk create as a role-gated feature (Admin + HoD/Faculty).

## Step 4: Implement role-name adaptation (School_ERP -> University_ERP)
- [ ] Add mapping layer for role-name mismatches.
- [ ] Ensure `RoleTabMapping.role` values align with `UserRole` union values.


## Step 5: Wire UI to role-specific configuration

- [x] Added API wrapper for `RoleTabMapping` in `src/api/roleTabApi.ts`.
- [x] Added reusable UI renderer component: `src/components/RoleTabs/RoleTabRenderer.tsx`.
- [ ] Refactor hard-coded Admin tab routing toward a config-driven tab renderer.
- [ ] Add missing role tabs using RoleTabMapping endpoints (backend already supports query by role).



## Step 6: Integration & sanity checks
- [ ] TS compile / run app checks.
- [ ] Smoke test each supported role: Admin, Finance, Faculty, HoD, Dean, Registrar, VC/ProVC/Chancellor, Student/Parent.

