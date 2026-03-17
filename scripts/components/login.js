export function createLogin() {
	// <a class="login-header__home-btn" href="./index.html">Tillbaka</a>
	return `
    <header class="header login-header">
        <img
            src="./res/logo.png"
            alt="YumYum logotyp"
            class="login-header__logo"
        />
    </header>
    <main class="login">
        <h1 class="login__title">Logga in</h1>
        <form class="login__form">
            <label for="username" class="login__label">Användarnamn</label>
            <input
                type="text"
                class="login__input"
                id="username"
                name="username"
                required
                autocomplete="username"
            />
            <label for="password" class="login__label">Lösenord</label>
            <input
                type="password"
                class="login__input"
                id="password"
                name="password"
                required
                autocomplete="current-password"
            />
            <button class="login__submit-btn" id="loginBtn">
                Logga in
            </button>
        </form>
        <button class="login__register-btn" id="goToRegister">
            Inget användarkonto? Tryck här för att skapa!
        </button>
    </main>
    `;
}