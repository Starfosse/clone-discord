const listActions = [
  {
    name: "Gestion du server",
    actions: [
      {
        action: "Inviter",
        description: "Permet d'inviter de nouveaux membres",
        value: "invite_Member" as const,
      },
      {
        action: "Expulser",
        description: "Permet d'expluser un membre",
        value: "expel_Member" as const,
      },
      {
        action: "Modifier le serveur",
        description:
          "Permet la modification du profil du serveur",
        value: "edit_Server" as const,
      },
      {
        action: "Supprimer le serveur",
        description: "Permet la suppression du serveur",
        value: "delete_Server" as const,
      },
      {
        action: "Gestion des rôles",
        description:
          "Permet de créer, attribuer, supprimer et modifier les rôles",
        value: "role_Management" as const,
      },
      {
        action: "Voir les logs",
        description:
          "Permet de consulter l'historique des actions administrateurs du serveur",
        value: "view_Logs" as const,
      },
    ],
  },
  {
    name: "Gestions des salons et catégories",
    actions: [
      {
        action: "Gestion des salons",
        description:
          "Permet la création, modification et suppression des salons",
        value: "role_Management" as const,
      },
      {
        action: "Gestion des catégories",
        description:
          "Permet la création, modification et suppression des catégories",
        value: "category_Management" as const,
      },
      {
        action: "Voir",
        description: "Permet de voir les salons non-privés",
        value: "view_Channel" as const,
      },
      {
        action: "Ecrire",
        description:
          "Permet d'écrire dans les salons non-privés",
        value: "write_Channel" as const,
      },
      {
        action: "Parler",
        description:
          "Permet de parler dans les salons non-privés",
        value: "speak_Channel" as const,
      },
      {
        action: "Vidéo",
        description:
          "Permet de démarrer un chat visuel sur les salons non-privés",
        value: "video_Channel" as const,
      },
      {
        action: "Télécharger",
        description:
          "Permet de télécharger dans les salons non-privés",
        value: "download_Channel" as const,
      },
      {
        action: "Réaction",
        description:
          "Permet d'ajouter des réactions dans le serveur",
        value: "reaction_Channel" as const,
      },
      {
        action: "Supprimer des messages",
        description:
          "Permet de supprimer des messages dans des salons",
        value: "delete_Input_Channel" as const,
      },
    ],
  },
]

export default listActions
