import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../components/Section";
import folderService from "../services/post/folder.service";

export default function Archives() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    const subscription = folderService.getFolders().subscribe({
      next: (data) => {
        console.log("FOLDERS:", data.folders);

        setRes(data.folders);
      },

      error: (error) => {
        console.error("Eroare:", error);
      },
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">ARCHIVE</span>
          <h1>All stories in one place.</h1>
        </div>
      </section>

      <Section>
        <div className="archive-list">
          {res.map((folder) => (
            <Link to={`/folder/${folder._id}`} key={folder._id}>
              <h3>{folder.folderName}</h3>
              <span></span>
              <b>→</b>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
