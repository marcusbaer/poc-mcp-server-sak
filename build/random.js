import { BaseTools } from "./base.js";
export class RandomTools extends BaseTools {
    getInstructions() {
        return [
            {
                name: "random-instruction",
                argsSchema: undefined,
                handle: this.promptHandle,
            },
        ];
    }
    getTools() {
        return [
            {
                name: "random-city",
                description: "Get a random city out of a fix set of city names. Returns a JSON object with 'city'.",
                inputSchema: undefined,
                // outputSchema: z.object({
                //   city: z.string().describe("City name"),
                // }),
                handle: this.randomCityHandle,
            },
        ];
    }
    async randomCityHandle() {
        const cities = [
            { city: "Amsterdam", country: "Netherlands" },
            { city: "Berlin", country: "Germany" },
            { city: "Brussels", country: "Berlgium" },
            { city: "Hamburg", country: "Germany" },
            { city: "Leipzig", country: "Germany" },
            { city: "Marseille", country: "France" },
            { city: "Munich", country: "Germany" },
            { city: "Paris", country: "France" },
            { city: "Rome", country: "Italy" },
            { city: "Vienna", country: "Austria" },
            { city: "Warsaw", country: "Poland" },
            { city: "Zürich", country: "Switzerland" },
            { city: "Turin", country: "Italy" },
            { city: "Prague", country: "Czech Republic" },
            { city: "Barcelona", country: "Spain" },
            { city: "Madrid", country: "Spain" },
            { city: "Lisbon", country: "Portugal" },
            { city: "Copenhagen", country: "Denmark" },
            { city: "Stockholm", country: "Sweden" },
            { city: "Oslo", country: "Norway" },
            { city: "Helsinki", country: "Finland" },
            { city: "Dublin", country: "Ireland" },
            { city: "Edinburgh", country: "United Kingdom" },
            { city: "Glasgow", country: "United Kingdom" },
            { city: "Belfast", country: "United Kingdom" },
            { city: "Bratislava", country: "Slovakia" },
            { city: "Ljubljana", country: "Slovenia" },
            { city: "Zagreb", country: "Croatia" },
            { city: "Belgrade", country: "Serbia" },
            { city: "Sarajevo", country: "Bosnia and Herzegovina" },
            { city: "Skopje", country: "North Macedonia" },
            { city: "Podgorica", country: "Montenegro" },
            { city: "Tirana", country: "Albania" },
            { city: "Athens", country: "Greece" },
            { city: "Sofia", country: "Bulgaria" },
            { city: "Vilnius", country: "Lithuania" },
            { city: "Riga", country: "Latvia" },
            { city: "Tallinn", country: "Estonia" },
            { city: "Luxembourg", country: "Luxembourg" },
            { city: "Reykjavik", country: "Iceland" },
            { city: "Andorra la Vella", country: "Andorra" },
            { city: "Monaco", country: "Monaco" },
            { city: "San Marino", country: "San Marino" },
            { city: "Vatican City", country: "Vatican City" },
            { city: "Bern", country: "Switzerland" },
            { city: "Geneva", country: "Switzerland" },
            { city: "Basel", country: "Switzerland" },
            { city: "Lausanne", country: "Switzerland" },
            { city: "Lucerne", country: "Switzerland" },
            { city: "St. Gallen", country: "Switzerland" },
            { city: "Utrecht", country: "Netherlands" },
            { city: "Rotterdam", country: "Netherlands" },
            { city: "The Hague", country: "Netherlands" },
            { city: "Eindhoven", country: "Netherlands" },
            { city: "Groningen", country: "Netherlands" },
            { city: "Maastricht", country: "Netherlands" },
            { city: "Nijmegen", country: "Netherlands" },
            { city: "Düsseldorf", country: "Germany" },
            { city: "Cologne", country: "Germany" },
            { city: "Frankfurt", country: "Germany" },
            { city: "Stuttgart", country: "Germany" },
            { city: "Dortmund", country: "Germany" },
            { city: "Essen", country: "Germany" },
            { city: "Leeds", country: "United Kingdom" },
            { city: "Manchester", country: "United Kingdom" },
            { city: "Birmingham", country: "United Kingdom" },
            { city: "Glasgow", country: "United Kingdom" },
            { city: "Liverpool", country: "United Kingdom" },
            { city: "Bristol", country: "United Kingdom" },
            { city: "Marseille", country: "France" },
            { city: "Lyon", country: "France" },
            { city: "Toulouse", country: "France" },
            { city: "Nice", country: "France" },
            { city: "Nantes", country: "France" },
            { city: "Strasbourg", country: "France" },
            { city: "Bordeaux", country: "France" },
            { city: "London", country: "United Kingdom" },
        ];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        return { content: [{ type: "text", text: JSON.stringify(randomCity) }] };
    }
    async promptHandle(args) {
        return {
            messages: [
                {
                    role: "user",
                    content: {
                        type: "text",
                        text: `
              You are able to provide a random city to the context.
              When ever the user is asking for a random city name, you can try one of the randomizer tools, provided by Swiss Army Knife MCP.
            `,
                    },
                },
            ],
        };
    }
}
