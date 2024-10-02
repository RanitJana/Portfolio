import "./Top.css"

function Top() {
    return (
        <div className="topScroll" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <img src="/Images/icons8-upward-arrow-96.png" alt="" />
        </div>
    )
}

export default Top