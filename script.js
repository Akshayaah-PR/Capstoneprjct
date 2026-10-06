// =========================================
// CAMPUS GRAPH
// =========================================

const campusGraph = {

    "Main Gate": {
        "Bhaskara Block": 1
    },

    "Bhaskara Block": {
        "Main Gate": 1,
        "Cafe": 1
    },

    "Cafe": {
        "Bhaskara Block": 1,
        "Aryabhatta Ground Floor": 1
    },

    "Aryabhatta Ground Floor": {
        "Cafe": 1,
        "Department of Artificial Intelligence": 1,
        "Aryabhatta 1st Floor": 1
    },

    "Department of Artificial Intelligence": {
        "Aryabhatta Ground Floor": 1
    },

    "Aryabhatta 1st Floor": {
        "Aryabhatta Ground Floor": 1,
        "Department of Mechanical Engineering": 1,
        "3rd & 4th Year CSE Classes": 1,
        "Aryabhatta 2nd Floor": 1
    },

    "Department of Mechanical Engineering": {
        "Aryabhatta 1st Floor": 1
    },

    "3rd & 4th Year CSE Classes": {
        "Aryabhatta 1st Floor": 1
    },

    "Aryabhatta 2nd Floor": {
        "Aryabhatta 1st Floor": 1,
        "Department of Electrical and Electronics Engineering": 1,
        "Department of Computer Science and Engineering": 1,
        "Aryabhatta 3rd Floor": 1
    },

    "Department of Electrical and Electronics Engineering": {
        "Aryabhatta 2nd Floor": 1
    },

    "Department of Computer Science and Engineering": {
        "Aryabhatta 2nd Floor": 1
    },

    "Aryabhatta 3rd Floor": {
        "Aryabhatta 2nd Floor": 1,
        "Department of Mechatronics Engineering": 1
    },

    "Department of Mechatronics Engineering": {
        "Aryabhatta 3rd Floor": 1
    }
};



// =========================================
// DIJKSTRA'S SHORTEST PATH ALGORITHM
// =========================================

function findShortestPath(start, destination) {

    const distances = {};
    const previous = {};
    const unvisited = new Set();


    // Initialize locations

    for (let location in campusGraph) {

        distances[location] = Infinity;

        previous[location] = null;

        unvisited.add(location);
    }


    distances[start] = 0;


    // Main Dijkstra loop

    while (unvisited.size > 0) {

        let current = null;


        // Find nearest unvisited location

        for (let location of unvisited) {

            if (
                current === null ||
                distances[location] < distances[current]
            ) {
                current = location;
            }
        }


        // No route available

        if (
            current === null ||
            distances[current] === Infinity
        ) {
            break;
        }


        // Destination reached

        if (current === destination) {
            break;
        }


        unvisited.delete(current);


        // Check neighboring locations

        for (
            let neighbor in campusGraph[current]
        ) {

            const weight =
                campusGraph[current][neighbor];

            const newDistance =
                distances[current] + weight;


            if (
                newDistance <
                distances[neighbor]
            ) {

                distances[neighbor] =
                    newDistance;

                previous[neighbor] =
                    current;
            }
        }
    }


    // Build path

    const path = [];

    let current = destination;


    while (current !== null) {

        path.unshift(current);

        current = previous[current];
    }


    // No route found

    if (
        path.length === 1 &&
        path[0] !== start
    ) {

        return null;
    }


    return {

        path: path,

        distance: distances[destination]

    };
}



// =========================================
// DISPLAY ROUTE
// =========================================

function displayRoute(result) {

    const routePath =
        document.getElementById("routePath");

    const totalDistance =
        document.getElementById("totalDistance");

    const resultCard =
        document.getElementById("resultCard");

    const routeSummary =
        document.getElementById("routeSummary");


    routePath.innerHTML = "";


    // Display each location

    result.path.forEach(
        (location, index) => {

            const node =
                document.createElement("div");

            node.className =
                "route-node";

            node.textContent =
                location;

            routePath.appendChild(node);


            // Add arrow between locations

            if (
                index <
                result.path.length - 1
            ) {

                const arrow =
                    document.createElement("div");

                arrow.className =
                    "route-connector";

                arrow.textContent = "↓";

                routePath.appendChild(arrow);
            }
        }
    );


    routeSummary.textContent =
        `${result.path.length - 1} connection(s) between your locations.`;

    totalDistance.textContent =
        `${result.distance} unit(s)`;


    resultCard.classList.remove("hidden");


    // Scroll to result

    resultCard.scrollIntoView({
        behavior: "smooth"
    });
}



// =========================================
// FIND ROUTE BUTTON
// =========================================

document
    .getElementById("findRouteBtn")
    .addEventListener(
        "click",
        function () {


            const start =
                document.getElementById(
                    "startLocation"
                ).value;


            const destination =
                document.getElementById(
                    "destination"
                ).value;


            // Check selections

            if (!start || !destination) {

                alert(
                    "Please select both a starting location and destination."
                );

                return;
            }


            // Same location

            if (start === destination) {

                alert(
                    "Starting location and destination cannot be the same."
                );

                return;
            }


            // Find shortest path

            const result =
                findShortestPath(
                    start,
                    destination
                );


            // Display result

            if (result) {

                displayRoute(result);

            } else {

                alert(
                    "No route was found between these locations."
                );
            }

        }
    );