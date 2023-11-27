-- CreateTable
CREATE TABLE "completed_order" (
    "id" UUID NOT NULL,
    "table" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "items" JSONB[],
    "total_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "completed_order_pkey" PRIMARY KEY ("id")
);
