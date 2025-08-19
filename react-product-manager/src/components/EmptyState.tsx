export function EmptyState() {
  return (
    <div
      className="
      bg-white                  /* Fundal alb */
      text-center               /* Text aliniat pe centru */
      p-16                      /* Padding generos */
      rounded-xl                /* Colțuri rotunjite */
      border border-slate-200   /* Bordură fină */
      shadow-sm                 /* Umbră subtilă */
    "
    >
      <h3
        className="
        text-lg font-bold       /* Text mai mare și îngroșat */
        text-slate-700            /* Culoare text */
        mb-2                      /* Spațiu sub el (margin-bottom) */
      "
      >
        No products found
      </h3>
      <p
        className="
        text-sm text-slate-500    /* Text mai mic și mai deschis la culoare */
      "
      >
        Add your first product to get started!
      </p>
    </div>
  );
}
