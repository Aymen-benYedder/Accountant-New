import React from "react";
import { Div } from "@jumbo/shared";
import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { ContactItem } from "../ChatContactItem";
import api from "@app/_utilities/api";

// JWT util copied from user list page
function getCurrentUserJwt(): { userId: string | null, role: string | null } {
  const token = localStorage.getItem('token');
  if (!token) return { userId: null, role: null };
  try {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded && decoded.id ? decoded.id : (decoded._id ? decoded._id : null),
      role: decoded && decoded.role ? decoded.role : null
    };
  } catch {
    return { userId: null, role: null };
  }
}

const ChatContactsList = () => {
  const [contacts, setContacts] = React.useState<any[]>([]);
  React.useEffect(() => {
    async function fetchContacts() {
      const { userId, role } = getCurrentUserJwt();
      if (role !== "accountant" || !userId) return setContacts([]);
      // Load companies and users, then filter to owners managed by this accountant
      const [companiesRes, usersRes] = await Promise.all([
        api.get("/companies"),
        api.get("/users")
      ]);
      const managedCompanies = companiesRes.data.filter((c: any) => c.accountant === userId);
      const ownerIds = Array.from(new Set(managedCompanies.map((c: any) => c.owner)));
      const ownerUsers = usersRes.data.filter(
        (u: any) => u.role === "owner" && ownerIds.includes(u._id)
      );
      setContacts(ownerUsers);
    }
    fetchContacts();
  }, []);

  return (
    <Div>
      <TransitionGroup>
        {contacts.map((user, index) => (
          <Collapse key={user._id || index}>
            <ContactItem contactItem={user} />
          </Collapse>
        ))}
      </TransitionGroup>
    </Div>
  );
};

export { ChatContactsList };
