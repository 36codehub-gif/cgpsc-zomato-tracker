// ============================================
// Chhattisgarh Election Survey Analyzer
// ============================================

// Standard Normal CDF
function normalCDF(z) {
    const sign = z < 0 ? -1 : 1;
    z = Math.abs(z);

    const t = 1 / (1 + 0.2316419 * z);

    const d = 0.3989423 * Math.exp(-z * z / 2);

    const probability =
        d *
        t *
        (
            0.3193815 +
            t *
            (
                -0.3565638 +
                t *
                (
                    1.781478 +
                    t *
                    (
                        -1.821256 +
                        t * 1.330274
                    )
                )
            )
        );

    return 1 - probability * sign;
}


// ============================================
// Parse Community Data
// ============================================

function parseCommunityData(text) {

    const result = [];

    if (!text.trim()) {
        return result;
    }

    const parts = text.split(",");

    parts.forEach(part => {

        const match = part.trim().match(
            /^(.+?)\s+(\d+(?:\.\d+)?)\s*%$/
        );

        if (match) {

            result.push({
                name: match[1].trim(),
                share: parseFloat(match[2])
            });

        }

    });

    return result;
}


// ============================================
// Candidate Alignment
// ============================================

function getAlignment(community, candidateBackground) {

    if (!candidateBackground) {
        return "Unknown";
    }

    const communityLower = community.toLowerCase();
    const candidateLower = candidateBackground.toLowerCase();

    if (
        communityLower.includes(candidateLower) ||
        candidateLower.includes(communityLower)
    ) {
        return "Strong";
    }

    if (
        candidateLower.includes("obc") &&
        communityLower.includes("obc")
    ) {
        return "Strong";
    }

    if (
        candidateLower.includes("st") &&
        communityLower.includes("st")
    ) {
        return "Strong";
    }

    if (
        candidateLower.includes("sc") &&
        communityLower.includes("sc")
    ) {
        return "Strong";
    }

    return "Neutral";
}


// ============================================
// Seat Classification
// ============================================

function classifySeat(probability, margin) {

    if (probability >= 85 && margin >= 7) {
        return "A — Safe Win";
    }

    if (probability >= 65 && margin >= 3) {
        return "B — Favorable";
    }

    if (probability >= 40 && margin >= -3) {
        return "C — Toss-Up";
    }

    return "D — High Risk";
}


// ============================================
// Risk Analysis
// ============================================

function generateRisks(antiIncumbency, undecided, margin) {

    const risks = [];

    if (antiIncumbency === "high") {
        risks.push(
            "High candidate-level anti-incumbency may reduce conversion of the existing survey lead."
        );
    } else if (antiIncumbency === "moderate") {
        risks.push(
            "Moderate anti-incumbency remains a significant uncertainty in the final vote."
        );
    } else {
        risks.push(
            "Candidate-level anti-incumbency appears limited, but constituency-level swings remain possible."
        );
    }

    if (undecided >= 10) {
        risks.push(
            "A relatively large undecided/others segment means the current survey margin has substantial uncertainty."
        );
    } else {
        risks.push(
            "Undecided voters are a smaller but still material source of late movement."
        );
    }

    if (margin < 5) {
        risks.push(
            "The current lead is narrow; third-party candidates, local rebels and vote fragmentation could materially alter the result."
        );
    } else {
        risks.push(
            "Third-party candidates and local factional dynamics remain important risks despite the current lead."
        );
    }

    return risks.slice(0, 3);
}


// ============================================
// Main Analysis Function
// ============================================

function analyzeElection() {

    const region =
        document.getElementById("region").value;

    const constituency =
        document.getElementById("constituency").value || "Unnamed Constituency";

    const seatNo =
        document.getElementById("seatNo").value || "--";

    const candidate =
        document.getElementById("candidateName").value || "Proposed Candidate";

    const candidateBackground =
        document.getElementById("candidateBackground").value.trim();

    const sampleSize =
        parseFloat(document.getElementById("sampleSize").value);

    const partyShare =
        parseFloat(document.getElementById("partyShare").value);

    const competitorShare =
        parseFloat(document.getElementById("competitorShare").value);

    const undecided =
        parseFloat(document.getElementById("undecided").value);

    const antiIncumbency =
        document.getElementById("antiIncumbency").value;

    const communityText =
        document.getElementById("communityMix").value;


    // ========================================
    // Validation
    // ========================================

    if (!sampleSize || sampleSize <= 0) {
        alert("Please enter a valid sample size.");
        return;
    }

    if (
        partyShare < 0 ||
        competitorShare < 0 ||
        undecided < 0 ||
        partyShare > 100 ||
        competitorShare > 100 ||
        undecided > 100
    ) {
        alert("Vote shares must be between 0 and 100.");
        return;
    }

    const total =
        partyShare +
        competitorShare +
        undecided;

    if (Math.abs(total - 100) > 0.5) {

        const proceed = confirm(
            `The entered vote shares total ${total.toFixed(1)}%, not 100%. Continue anyway?`
        );

        if (!proceed) return;
    }


    // ========================================
    // Statistical Calculation
    // ========================================

    const p1 = partyShare / 100;
    const p2 = competitorShare / 100;

    const margin = p1 - p2;

    /*
        Approximate standard error for difference
        between two independent proportions.
    */

    const standardError = Math.sqrt(
        (
            p1 * (1 - p1) +
            p2 * (1 - p2)
        ) / sampleSize
    );

    const zScore =
        margin / standardError;


    // Probability that Party 1 > Party 2
    let probability =
        normalCDF(zScore) * 100;

    probability =
        Math.max(0, Math.min(100, probability));


    const marginPercentage =
        margin * 100;

    const sePercentage =
        standardError * 100;


    // ========================================
    // Seat Classification
    // ========================================

    const category =
        classifySeat(
            probability,
            marginPercentage
        );


    // ========================================
    // Update UI
    // ========================================

    document.getElementById("results")
        .classList.remove("hidden");

    document.getElementById("reportTitle")
        .textContent =
        `${constituency} (${seatNo}) • ${region}`;

    document.getElementById("marginResult")
        .textContent =
        `${marginPercentage.toFixed(2)}%`;

    document.getElementById("seResult")
        .textContent =
        `${sePercentage.toFixed(2)}%`;

    document.getElementById("zResult")
        .textContent =
        zScore.toFixed(2);

    document.getElementById("probabilityResult")
        .textContent =
        `${probability.toFixed(1)}%`;

    document.getElementById("categoryResult")
        .textContent =
        category;


    // ========================================
    // Statistical Interpretation
    // ========================================

    let interpretation = "";

    if (probability >= 85) {

        interpretation =
            `The survey indicates a strong statistical advantage for the proposed party. ` +
            `The estimated probability is ${probability.toFixed(1)}%, with a survey margin of ` +
            `${marginPercentage.toFixed(2)} percentage points. ` +
            `This should still be interpreted as a survey estimate rather than a guaranteed outcome.`;

    } else if (probability >= 65) {

        interpretation =
            `The survey indicates a favorable position, with an estimated probability of ` +
            `${probability.toFixed(1)}%. The lead is ${marginPercentage.toFixed(2)} percentage points, ` +
            `but constituency-level uncertainty and late vote movement should be monitored.`;

    } else if (probability >= 40) {

        interpretation =
            `The constituency should be treated as competitive. The estimated probability is ` +
            `${probability.toFixed(1)}%, meaning the observed survey lead is not sufficiently decisive ` +
            `to treat the seat as secure.`;

    } else {

        interpretation =
            `The survey indicates a high-risk position. The proposed party is currently behind or has ` +
            `insufficient statistical advantage. Additional constituency-level evidence should be reviewed ` +
            `before making a ticket decision.`;
    }

    document.getElementById("statisticalText")
        .textContent = interpretation;


    // ========================================
    // Community Table
    // ========================================

    const communityTable =
        document.getElementById("communityTable");

    communityTable.innerHTML = "";

    const communities =
        parseCommunityData(communityText);

    if (communities.length === 0) {

        communityTable.innerHTML = `
            <tr>
                <td colspan="4">
                    No community data entered.
                </td>
            </tr>
        `;

    } else {

        communities.forEach(item => {

            const alignment =
                getAlignment(
                    item.name,
                    candidateBackground
                );

            let assessment = "";

            if (alignment === "Strong") {
                assessment =
                    "Potentially relevant coalition alignment";
            } else if (alignment === "Neutral") {
                assessment =
                    "No direct alignment inferred";
            } else {
                assessment =
                    "Insufficient candidate information";
            }

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${escapeHTML(item.name)}</td>
                <td>${item.share.toFixed(1)}%</td>
                <td>${alignment}</td>
                <td>${assessment}</td>
            `;

            communityTable.appendChild(row);
        });
    }


    // ========================================
    // Ticket Decision
    // ========================================

    let decision;
    let decisionClass = "";

    if (
        probability >= 75 &&
        antiIncumbency !== "high"
    ) {

        decision =
            `<strong>Recommended for Ticket</strong><br>
            Current survey evidence supports retaining this candidate, 
            subject to organizational and qualitative verification.`;

        decisionClass = "positive";

    } else if (probability >= 55) {

        decision =
            `<strong>Conditional Recommendation</strong><br>
            The candidate remains viable, but the party should compare 
            this candidate against at least one credible alternative before final allocation.`;

        decisionClass = "neutral";

    } else {

        decision =
            `<strong>Reconsider Candidate</strong><br>
            Current survey evidence does not provide a sufficiently strong 
            statistical basis for treating this candidate as the preferred option.`;

        decisionClass = "negative";
    }

    const decisionBox =
        document.getElementById("ticketDecision");

    decisionBox.innerHTML = decision;

    decisionBox.className =
        `decision-box ${decisionClass}`;


    // ========================================
    // Risk Factors
    // ========================================

    const riskList =
        document.getElementById("riskList");

    riskList.innerHTML = "";

    const risks =
        generateRisks(
            antiIncumbency,
            undecided,
            marginPercentage
        );

    risks.forEach(risk => {

        const li =
            document.createElement("li");

        li.textContent = risk;

        riskList.appendChild(li);
    });


    // Scroll to result
    document.getElementById("results")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ============================================
// Security Helper
// ============================================

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
