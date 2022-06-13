import { BasicLayout } from "../../layouts/basic/BasicLayout";
import { FirebaseCheck } from "./FirebaseCheck";

export interface HomePageProps {
  children: React.ReactNode;
}

export function HomePage(): JSX.Element {
  return (
    <BasicLayout name="HomePage" title="Home">
      <h1>HomePage</h1>
      <p><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur inventore necessitatibus laudantium alias accusamus culpa, reiciendis molestiae ullam a. Voluptatem saepe nam modi quis accusantium laborum deleniti repellat sit reiciendis.</span></p>
      <p><span>Incidunt veniam possimus ducimus ut ipsa fuga sint molestias eligendi aut? Illum quo incidunt voluptas fuga sit repellat sapiente veritatis, repudiandae cumque, molestiae, obcaecati quod! Porro fugiat at distinctio nam?</span><span>Expedita in porro culpa, amet iusto ut. Voluptatum quae aliquam suscipit voluptates eos sit, excepturi fugiat iusto quasi! Eligendi nostrum laudantium inventore adipisci provident odit velit magnam ullam repellendus iusto.</span><span>Ullam incidunt id error natus tempora corrupti quisquam eius ipsa in enim molestiae dolor, itaque temporibus reiciendis culpa doloribus. Distinctio, explicabo ad cupiditate dignissimos placeat neque vel. Reprehenderit, tempore quod?</span><span>Quas animi placeat saepe nostrum doloremque quisquam voluptatibus neque incidunt esse nemo, aliquam provident iure, dolorem facere tempora soluta aliquid rem, in eveniet itaque deleniti voluptate eum quae dolorum. Sint.</span></p>
      <FirebaseCheck />
    </BasicLayout>
  );
}
