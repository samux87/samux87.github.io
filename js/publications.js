async function loadBibtex() {
    const response = await fetch("assets/pubs.bib");
    const bibText = await response.text();

    const parsed = bibtexParse.toJSON(bibText);

    const publications = parsed.map(entry => {
        const f = entry.entryTags;

        return {
            type: entry.entryType,
            key: entry.citationKey,
            title: cleanLatex(f.title || ""),
            year: parseInt(f.year || "0"),
            journal: cleanLatex(f.journal || f.booktitle || ""),
            authors: formatAuthors(f.author || "")
        };
    }).sort((a, b) => b.year - a.year);

    renderPublications(publications);
}

loadBibtex();
