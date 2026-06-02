<footer class="site-footer">
    <div class="footer-content">
        <div class="footer-section">
            <h3>Gamma.</h3>
            <p class="status">Statut: <span class="active">Transmission active</span></p>
            <p class="legal">
                <?php if (isset($_SESSION['user'])): ?>
                    <a href="logout.php">Se déconnecter</a>
                <?php else: ?>
                    <a href="login.php">Se connecter</a>
                <?php endif; ?>
            </p>

        </div>

        <div class="footer-section">
            <nav>
                <a href="#">Journal de mission</a>
                <a href="#">Données brutes</a>
                <a href="#">Archives</a>
            </nav>
        </div>

        <div class="footer-section">
            <p>&copy; 2026 Mission Aurora</p>
            <p>Conçu par John Doe Team</p>
            <p class="legal"><a href="#">Mentions légales</a></p>
        </div>
    </div>
</footer>