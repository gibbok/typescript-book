# strictNullChecks



`strictNullChecks` est une option du compilateur TypeScript qui impose une vérification stricte des valeurs nulles. Lorsque cette option est activée, `null` ou `undefined` ne peuvent être affectés aux variables et aux paramètres que si ceux-ci ont été explicitement déclarés avec ce type au moyen du type union `null` | `undefined`. Si une variable ou un paramètre n’est pas explicitement déclaré comme nullable, TypeScript génère une erreur afin d’éviter de potentielles erreurs lors de l’exécution.

