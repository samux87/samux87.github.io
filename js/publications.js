const publications = [
    {
        year: 2026,
        type: "Journal article",
        title: "Integrating knowledge graph embeddings with clinical data: A case study on Acute Kidney Injury prediction",
        authors: ["Samuele Buosi", "Mohan Timilsina", "Conor Judge", "Edward Curry"],
        venue: "Informatics in Medicine Unlocked, 61, 101734",
        doi: "10.1016/j.imu.2026.101734",
        url: "https://doi.org/10.1016/j.imu.2026.101734"
    },
    {
        year: 2025,
        type: "Journal article",
        title: "RAG4DS: Retrieval-Augmented Generation for Data Spaces - A Unified Lifecycle, Challenges, and Opportunities",
        authors: ["Majjed Al-Qatf", "Rafiqul Haque", "Saeed Hamood Alsamhi", "Samuele Buosi", "Muhammad Asif Razzaq", "Mohan Timilsina", "Ammar Hawbani", "Edward Curry"],
        venue: "IEEE Access, 13, 39510-39522",
        doi: "10.1109/ACCESS.2025.3545387",
        url: "https://doi.org/10.1109/ACCESS.2025.3545387"
    },
    {
        year: 2025,
        type: "Journal article",
        title: "Harmonizing foundation models in healthcare: A comprehensive survey of their roles, relationships, and impact in artificial intelligence's advancing terrain",
        authors: ["Mohan Timilsina", "Samuele Buosi", "Muhammad Asif Razzaq", "Rafiqul Haque", "Conor Judge", "Edward Curry"],
        venue: "Computers in Biology and Medicine, 189, 109925",
        doi: "10.1016/j.compbiomed.2025.109925",
        url: "https://doi.org/10.1016/j.compbiomed.2025.109925"
    },
    {
        year: 2025,
        type: "Journal article",
        title: "Large language model vs. traditional machine learning: Evaluating predictive models for early detection of tumor relapse",
        authors: ["Mohan Timilsina", "Samuele Buosi", "Maria Torrente", "Mariano Provencio", "Manuel Cobo", "Delvys Rodriguez Abreu", "Rafael Castro", "Enric Carcereny", "Edward Curry", "Vit Novacek"],
        venue: "Expert Systems with Applications, 283, 127641",
        doi: "10.1016/j.eswa.2025.127641",
        url: "https://doi.org/10.1016/j.eswa.2025.127641"
    },
    {
        year: 2024,
        type: "Conference paper",
        title: "BERT-Based Deep Learning for Classification of IgA Nephropathy, Diabetes, and Hypertension from Clinical Notes",
        authors: ["Samuele Buosi", "Mohan Timilsina", "Luke Harris", "Sarah Monahan", "Kieran Arthur", "Niamh Corcoran", "Nina Deacon", "Michael Wrynn", "Richard Farnan", "David Keane", "George Mellotte", "Donal Reddan", "Finn Krewer", "Edward Curry", "Conor Judge"],
        venue: "IEEE BIBM 2024, 6678-6684",
        doi: "10.1109/BIBM62325.2024.10822369",
        url: "https://doi.org/10.1109/BIBM62325.2024.10822369"
    },
    {
        year: 2024,
        type: "Journal article",
        title: "Boosting predictive models and augmenting patient data with relevant genomic and pathway information",
        authors: ["Samuele Buosi", "Mohan Timilsina", "Maria Torrente", "Mariano Provencio", "Dirk Fey", "Vit Novacek"],
        venue: "Computers in Biology and Medicine, 174, 108398",
        doi: "10.1016/j.compbiomed.2024.108398",
        url: "https://doi.org/10.1016/j.compbiomed.2024.108398"
    },
    {
        year: 2024,
        type: "Journal article",
        title: "Machine learning estimated probability of relapse in early-stage non-small-cell lung cancer patients with aneuploidy imputation scores and knowledge graph embeddings",
        authors: ["Samuele Buosi", "Mohan Timilsina", "Adrianna Janik", "Luca Costabello", "Maria Torrente", "Mariano Provencio", "Dirk Fey", "Vit Novacek"],
        venue: "Expert Systems with Applications, 235, 121127",
        doi: "10.1016/j.eswa.2023.121127",
        url: "https://doi.org/10.1016/j.eswa.2023.121127"
    },
    {
        year: 2023,
        type: "Journal article",
        title: "Synergy between imputed genetic pathway and clinical information for predicting recurrence in early stage non-small cell lung cancer",
        authors: ["Mohan Timilsina", "Dirk Fey", "Samuele Buosi", "Adrianna Janik", "Luca Costabello", "Enric Carcereny", "Delvys Rodriguez Abreu", "Manuel Cobo", "Rafael Castro", "Reyes Bernabe", "Pasquale Minervini", "Maria Torrente", "Mariano Provencio", "Vit Novacek"],
        venue: "Journal of Biomedical Informatics, 144, 104424",
        doi: "10.1016/j.jbi.2023.104424",
        url: "https://doi.org/10.1016/j.jbi.2023.104424"
    },
    {
        year: 2023,
        type: "Conference paper",
        title: "Enabling Dataspaces Using Foundation Models: Technical, Legal and Ethical Considerations and Future Trends",
        authors: ["Mohan Timilsina", "Samuele Buosi", "Ping Song", "Yang Yang", "Rafiqul Haque", "Edward Curry"],
        venue: "IEEE Big Data 2023, 4712-4721",
        doi: "10.1109/BigData59044.2023.10386933",
        url: "https://doi.org/10.1109/BigData59044.2023.10386933"
    },
    {
        year: 2023,
        type: "Conference paper",
        title: "Machine Learning Survival Models for Relapse Prediction in a Early Stage Lung Cancer Patient",
        authors: ["Mohan Timilsina", "Samuele Buosi", "Adrianna Janik", "Pasquale Minervini", "Luca Costabello", "Maria Torrente", "Mariano Provencio", "Virginia Calvo", "Carlos Camps", "Ana L. Ortega", "Bartomeu Massuti", "M. Rosario Garcia Campelo", "Edel del Barco", "Joaquim Bosch-Barrera", "Vit Novacek"],
        venue: "IJCNN 2023, 1-8",
        doi: "10.1109/IJCNN54540.2023.10191078",
        url: "https://doi.org/10.1109/IJCNN54540.2023.10191078"
    }
];

function renderAuthorList(authors) {
    return authors.map(author => {
        if (author === "Samuele Buosi") {
            return `<strong>${author}</strong>`;
        }

        return author;
    }).join(", ");
}

function renderPublications() {
    const publicationList = document.querySelector("#pub-list");

    if (!publicationList) {
        return;
    }

    publicationList.innerHTML = publications.map(publication => `
        <article class="publication-item">
            <div class="publication-meta">
                <span>${publication.year}</span>
                <span>${publication.type}</span>
            </div>
            <h3>${publication.title}</h3>
            <p class="publication-authors">${renderAuthorList(publication.authors)}</p>
            <p class="publication-venue">${publication.venue}</p>
            <a class="publication-link" href="${publication.url}" target="_blank" rel="noopener noreferrer" aria-label="Open DOI ${publication.doi}">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                DOI ${publication.doi}
            </a>
        </article>
    `).join("");
}

window.addEventListener("DOMContentLoaded", renderPublications);
