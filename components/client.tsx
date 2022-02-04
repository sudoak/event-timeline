import { clientInterface } from "../lib/interfaces/clientInterface";

interface props {
  Client: clientInterface;
}
const Client: React.FC<props> = ({ client }) => {
    return <div>Client</div>
};

export default Client;
