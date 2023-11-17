import React from "react";
import { TableRowSkeleton } from "./Skeletons";
import Image from "next/image";
import { Message } from "@/types";
import Link from "next/link";

const Table: React.FC<{ messages: Message[] }> = ({ messages }) => {
  return (
    <div className="border-2 border-primary rounded mt-2 max-h-[500px] overflow-y-auto">
      <table className="relative w-full">
        <thead className="border-b border-b-primary bg-primary bg-opacity-30">
          <th className="py-1">Name</th>
          <th className="py-1">Message</th>
          <th className="py-1">Attachments</th>
          <th className="py-1">Time</th>
        </thead>
        <tbody className="text-center">
          {messages.map((m: Message, index: number) => (
            <tr
              key={m.id}
              className={index % 2 === 1 ? "bg-primary bg-opacity-10" : ""}
            >
              <td className="py-1" style={{ maxWidth: "200px" }}>
                {m.author.global_name || "Bot"}
              </td>
              <td
                className="py-1 truncate cursor-default"
                style={{ maxWidth: "300px" }}
                title={m.content.replace(/<[^>]+>/g, "")}
              >
                {m.content.replace(/<[^>]+>/g, "")}
              </td>
              <td className="flex justify-center items-center py-1">
                {m.attachments.length > 0
                  ? m.attachments.map((a: any) => (
                      <Link
                        key={a.id}
                        href={a.url}
                        title="Share on Facebook"
                        target="popup"
                        onClick={() => {
                          const width = 800;
                          const height = 800;
                          const left =
                            window.innerWidth / 2 - width / 2 + window.screenX;
                          const top =
                            window.innerHeight / 2 -
                            height / 2 +
                            window.screenY;
                          window.open(
                            a.url,
                            "popup",
                            `width=${width},height=${height},left=${left},top=${top}`
                          );
                          return false;
                        }}
                      >
                        <Image
                          src={a.url}
                          width={100}
                          height={100}
                          alt={a.filename}
                        />
                      </Link>
                    ))
                  : "No attachments"}
              </td>
              <td className="py-1" style={{ maxWidth: "150px" }}>
                {m.edited_timestamp
                  ? new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(m.edited_timestamp))
                  : new Intl.DateTimeFormat("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    }).format(new Date(m.timestamp))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
