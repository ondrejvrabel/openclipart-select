# OpenClipart Select
Search and select cliparts from Openclipart.org

## Demo
Visit http://clipartselect.napr.eu/ for demo.

## Usage
When user clicks on search result, function `` is called. You can replace this function found in index.html with your own. For example, you could open index.html in popup and then transfer clipart data to using calls to parent or postmessages.
`
function clipartSelected(clipart) {
            alert(clipart.svg.url);
        }
`
## License
This work is released under MIT License.
