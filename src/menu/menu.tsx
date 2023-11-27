import { Drawer } from "@mui/material";

interface MenuProps {
  isMenuOpen: boolean;
  onClose: () => void;
}

export const Menu = ({isMenuOpen, onClose}: MenuProps) => {
  return <Drawer
    anchor="left"
    open={isMenuOpen}
    onClose={onClose}
  >
    <div style={{ width: "250px" }}></div>
  </Drawer>

};
