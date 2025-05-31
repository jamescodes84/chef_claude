import chefClaudeLogo from "/src/assets/chef-claude-icon.png"

export default function Header() {
    return (
        <header className="mainHeader">
            <div className="header">
                <img src={chefClaudeLogo} />
                <h1>Chef Claude</h1>
            </div>
        </header>
    )
}