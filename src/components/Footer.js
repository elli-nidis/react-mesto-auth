function Footer() {
  const date = new Date();
  return (
    <footer className="footer">
    <p className="footer__info">
      &#169; {`${date.getFullYear()}`} Mesto Russia
    </p>
  </footer>
  );
}

export {Footer};