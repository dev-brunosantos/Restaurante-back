-- CreateTable
CREATE TABLE "Produtos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Produtos_nome_key" ON "Produtos"("nome");
