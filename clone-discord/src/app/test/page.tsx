<FormMessage />
<FormMessage className="col-span-4 text-right" />

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

<Label
                htmlFor="name"
                className={cn("text-right", {
                  "text-red-500": errors.name,
                })}>
                Nom de la catégorie
              </Label>
              <Input
                {...register("name")}
                placeholder={
                  editCategoryProps.ChannelGroup.name
                }
                className="col-span-3"
              />
              {errors.name && (
                <p
                  className="col-span-4 text-red-500 text-right"
                  role="alert">
                  {errors.name.message}{" "}
                </p>
              )}


whitespace-pre-wrap break-all

overflow-ellipsis overflow-hidden whitespace-nowrap
truncate