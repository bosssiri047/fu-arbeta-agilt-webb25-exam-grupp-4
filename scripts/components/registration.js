export function createRegistration() {
	return `
    <header class="header login-header">
			<img
				src="./res/logo.png"
				alt="YumYum logotyp"
				class="login-header__logo"
			/>
		</header>
		<main class="login">
			<h1 class="login__title">Registration</h1>
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
				<label for="email" class="login__label">Email</label>
				<input
					type="email"
					class="login__input"
					id="email"
					name="email"
					required
					autocomplete="email"
				/>
				<label for="password" class="login__label">Lösenord</label>
				<input
					type="password"
					class="login__input"
					id="password"
					name="password"
					required
					autocomplete="new-password"
				/>
				<button class="login__submit-btn" id="registerBtn">
					Avsluta registrering
				</button>
			</form>
			<button class="login__register-btn" id="goToLogin">
				Tillbaka till logga in
			</button>
		</main>
    `;
}