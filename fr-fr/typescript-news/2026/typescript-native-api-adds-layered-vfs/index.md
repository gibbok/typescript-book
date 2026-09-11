# L’API native de TypeScript ajoute des systèmes de fichiers virtuels en couches


**Publié le :** 9 septembre 2026

L’API native de TypeScript peut désormais créer et mettre à jour des snapshots à partir de données explicites de système de fichiers virtuel. Les outils peuvent ainsi représenter les ajouts, modifications et suppressions de fichiers sans reconstruire toute l’entrée du système de fichiers.

## Ce qui change

Les nouveaux helpers `createFileSystem`, `createFileSystemWithLib` et `createFileSystemLayer` créent des objets VFS acceptés par les API de snapshot. `Snapshot.update` peut appliquer une nouvelle couche de cache sur un snapshot existant.

Un VFS `full` reste entièrement en mémoire et ne se replie pas sur les callbacks du système de fichiers de l’hôte ou de la session. Un VFS `layer` se replie sur l’hôte lors d’un défaut de cache et peut utiliser `removedPaths` pour masquer des fichiers ou répertoires présents sur l’hôte. Les deux formes prennent en charge les liens symboliques dans le système de fichiers virtuel et vers des chemins de l’hôte.

## Limitation actuelle

Les snapshots adossés à un VFS comptent toujours comme de vrais snapshots. L’API native conserve donc sa restriction actuelle à un seul vrai snapshot à la fois, et les opérations restent sérielles pour le moment.

## Source

Lire la pull request TypeScript fusionnée : [Add optional VFS parameters to updateSnapshot](https://github.com/microsoft/TypeScript/pull/64115).
