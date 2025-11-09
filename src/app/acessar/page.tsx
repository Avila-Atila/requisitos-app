import AuthForm from "@/components/AuthForm/AuthForm";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";

export default function LoginPage() {
  return (
    <>
      <Header></Header>
      <main className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4">Acesse a plataforma</h2>
                <AuthForm></AuthForm>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </>
  );
}
