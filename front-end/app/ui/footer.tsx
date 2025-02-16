import * as stylex from "@stylexjs/stylex";

const Footer = () => {
  return (
  <div {...stylex.props(styles.footer)}>
    &copy; Twindoc 2025
  </div>
  )
}

export default Footer;

const styles = stylex.create({
  footer: {
    gridArea: 'footer',
    paddingHorizontal: 25,
    paddingVertical: 10
  },
});
