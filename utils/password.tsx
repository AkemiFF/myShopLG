function generatePassword(clientData: any) {
    const { postalCode, lastName, email } = clientData;

    // Extraire une partie de l'email
    const emailPart = email.split('@')[0];

    // Combiner les données du client
    const base = `${postalCode.slice(0, 2)}${lastName.slice(-2)}${emailPart}`;

    // Ajouter des caractères spéciaux et des chiffres aléatoires
    const specialChars = "!@#$%^&*";
    const randomSpecial = specialChars[Math.floor(Math.random() * specialChars.length)];
    const randomNumber = Math.floor(Math.random() * 100);

    // Générer le mot de passe final
    return `${base}${randomSpecial}${randomNumber}`;
}

export default generatePassword;