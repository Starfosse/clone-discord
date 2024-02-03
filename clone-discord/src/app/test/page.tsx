<FormMessage />

{errors.name && (
                <p className="col-span-4 text-red-500" role="alert">
                  {errors.name.message}{" "}
                </p>
              )}

              <p
                  className={cn({
                    "text-red-500": errors.name,
                  })}>

              toast.success(
                <div className="flex items-center">
                  <Check />
                  &nbsp;Votre catégorie a bien été enregistré
                </div>,
                { duration: 3000 }
              )

              className={cn(
                "h-4 w-4 transition-all text-muted-foreground",
                {
                  "-rotate-90": !isOpen,
                }
              )}