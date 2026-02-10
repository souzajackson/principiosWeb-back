CREATE UNIQUE INDEX IF NOT EXISTS adoptions_one_approved_per_animal
ON adoptions ("animalId")
WHERE status = 'APPROVED';
