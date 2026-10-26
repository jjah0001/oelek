-- Run these SQL contents in the existing Oelek Supabase project.
-- Idempotent: preserves every existing sambal ID and rating.
begin;
insert into public.oelek_sambals(id) values
('cengek'),
('pencok-kacang-panjang'),
('masin'),
('pencok-beras'),
('cabuk'),
('brambang-asem'),
('klotok'),
('ayam-pop'),
('kedondong'),
('bekasam'),
('jeruk-mentah'),
('genjer-limau-kuit'),
('kenikir'),
('jantung-pisang'),
('goreng-keong-mas'),
('gobal-gabul')
on conflict (id) do nothing;
commit;
