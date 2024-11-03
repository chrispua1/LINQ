function encodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return encodeFlashcardsV1(cards);
        default:
            return encodeFlashcardsV1(cards);
    }
}

function encodeFlashcardsV1(cards) {
    //return btoa(Array.from(new TextEncoder().encode(cards), (byte) => String.fromCodePoint(byte),).join(""));
    let bytes = new TextEncoder().encode(cards);
    let str = Array.from(bytes, (byte) =>
        String.fromCodePoint(byte),
    ).join("");
    return btoa(str);
}

function decodeFlashcards(cards, version) {
    switch (version) {
        case "1":
            return decodeFlashcardsV1(cards);
        default:
            return decodeFlashcardsV1(cards);
    }
}

function decodeFlashcardsV1(cards) {
    //return new TextDecoder().decode(Uint8Array.from(atob(cards), (m) => m.codePointAt(0)));
    const str = atob(cards);
    return Uint8Array.from(str, (m) => m.codePointAt(0));
}

function cardsToObject(cards) {
    let safeString = cards
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&apos;");
    let flashcards = safeString.split(/\r\n|\r|\n/g);
    let cards = [];
    flashcards.forEach((element) => {
        let card = element.split("\t");
        cards.push({front: card[0], back: card[1]});
    });
    return cards;
}
