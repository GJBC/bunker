How to use Git
==============

Les 3 zones de travail :
![img/areas.png](img/areas.png)

**Initialiser un repo Git :**
```bash
git init
```

**Obtenir le statut des fichiers (new, modified or removed) du Working Directory (indexation dans la Staging Area) :**
```bash
git status
```

**Indexer l'état d'un fichier dans la Staging Area :**
```bash
git add my-file.md
```

Indexer tous les fichiers d'un dossier :
```bash
git add dir
```

Sélecteur universel :
```bash
git add *.png
```

**Supprimer un fichier (et indexer la suppression) :**
```bash
git rm my-file.txt
```

Options :
- **`--cached` Supprimer uniquement de la Staging Area.**

**Commiter la Staging Area :**
```bash
git commit
```

Options :
- `-a` Commiter en indexant les *modifications et suppressions* (pas les nouveaux fichiers).
- `-m` Préciser en argument le message de commit.

```bash
git commit -am "Fix bug #13"
```

**Afficher l'historique des commits :**
```bash
git log
```

Presser `q` pour quitter le log.

Le log est paginé par défaut par Less. 

**Se positionner sur un commit passé :**
```bash
git checkout d332
```











Cf : [la configuration de Git](git-scm.com/book/fr/v1/Personnalisation-de-Git-Configuration-de-Git).
