// Hit Load More every second on Ticker Tape Screener
function infiniteLoadMore() {
    screenerTable = document.getElementById("screener-table")
    setInterval(() => {
        screenerTable.scrollTop = screenerTable.scrollHeight
        Array.from(document.getElementsByTagName('button')).filter(btn => btn.innerText=="Load More").forEach(btn => btn.click())
    }, 1000)    
}

function getScreenerTableAsObj() {
    screenerTable = document.getElementById("screener-table")
    let [screenerHeadings, screenerVals] = screenerTable.children
    screenerHeadings = Array.from(screenerHeadings.children).map(heading => heading.innerText)
    screenerVals = Array.from(screenerVals.children).map(col => col.innerText.split("\n"))
    screenerTable = []
    for(i=0; i<screenerVals[1].length; i++) {
        screenerRow = {}
        screenerHeadings.forEach(
            (_heading, j) => {
                screenerRow[_heading] = screenerVals[j][i]
            }
        )
        screenerTable.push(screenerRow)
    }
    return screenerTable
}

function getScreenerTableAsTSV() {
    screenerTable = document.getElementById("screener-table")
    let [screenerHeadings, screenerVals] = screenerTable.children
    screenerHeadings = Array.from(screenerHeadings.children).map(heading => heading.innerText)
    screenerVals = Array.from(screenerVals.children).map(col => col.innerText.split("\n"))
    screenerTSV = [[...screenerHeadings]]
    for(i=0; i<screenerVals[1].length; i++) {
        screenerRow = screenerHeadings.map((_, j) => screenerVals[j][i])
        screenerTSV.push(screenerRow)
    }
    csvContent = "data:text/tsv;charset=utf-8," + screenerCSV.map(e => e.join("\t")).join("\n")
    let encodedUri = encodeURI(csvContent);
    let _link = document.createElement("a");
    _link.setAttribute("href", encodedUri);
    _link.setAttribute("download", "screener.tsv");
    document.body.appendChild(_link);
    _link.click();
}
