import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllContacts } from "../../helper/contactApiFunctions";
import { useEffect } from "react";
import { useContactStore } from "../../store/ContactStore";
import { useNavigate } from "react-router";

const Contact = () => {
  const navigate = useNavigate();
  const allContacts = useContactStore((state) => state.allContacts);
  const setAllContacts = useContactStore((state) => state.setAllContacts);

  const contactQuery = useQuery({
    queryKey: ["contacts"],
    queryFn: getAllContacts,
  });

  useEffect(() => {
    if (contactQuery.data) {
      setAllContacts(contactQuery.data.data);
    }
  }, [contactQuery.data, setAllContacts]);
  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        Contacts from Employers
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          flexWrap: "wrap",
          my: 3,
        }}
      >
        {allContacts.map((contact) => {
          return (
            <Card
              key={contact.id}
              sx={{ minWidth: 275, boxShadow: "none", borderRadius: 3 }}
            >
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {contact.title}
                </Typography>
                <Typography variant="h5" component="div">
                  {contact.user.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {contact.user.email}
                </Typography>
                <Typography variant="body2">{contact.message}</Typography>
              </CardContent>
              <CardActions
                onClick={() =>
                  navigate(`/admin/employer/${contact.user_id}/manage`)
                }
              >
                <Button size="small">Go to employer</Button>
              </CardActions>
            </Card>
          );
        })}
        {allContacts.length == 0 && <Typography>No messages</Typography>}
      </Box>
    </Box>
  );
};

export default Contact;
