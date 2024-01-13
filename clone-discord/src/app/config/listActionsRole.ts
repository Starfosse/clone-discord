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
        value: "expulsate_Member" as const,
      },
      {
        action: "Modifier le serveur",
        description:
          "Permet la modification du profil du serveur",
        value: "edit_Server" as const,
      },
      {
        action: "Gestion des rôles",
        description:
          "Permet de créer, attribuer et modifier les rôles",
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
        action: "Créér/Supprimer",
        description:
          "Permet la création et suppression des salons ou catégories",
        value: "create_Remove_Channel" as const,
      },
      {
        action: "Modifier",
        description:
          "Permet la modification du profil d'un salon ou catégorie",
        value: "edit_Channel" as const,
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
    ],
  },
]

export default listActions
