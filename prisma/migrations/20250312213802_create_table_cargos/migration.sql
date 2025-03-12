-- CreateTable
CREATE TABLE "Cargos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cargo" TEXT NOT NULL,
    "dt_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dt_atualizacao" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cargos_cargo_key" ON "Cargos"("cargo");
