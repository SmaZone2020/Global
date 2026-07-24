using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GuoYunGlobal.Migrations
{
    /// <inheritdoc />
    public partial class AddGeneratedPoster : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GeneratedPosters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ProjectId = table.Column<int>(type: "INTEGER", nullable: false),
                    StyleKey = table.Column<string>(type: "TEXT", nullable: false),
                    StyleLabel = table.Column<string>(type: "TEXT", nullable: false),
                    CustomPrompt = table.Column<string>(type: "TEXT", nullable: false),
                    FinalPrompt = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneratedPosters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GeneratedPosters_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GeneratedPosters_ProjectId",
                table: "GeneratedPosters",
                column: "ProjectId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeneratedPosters");
        }
    }
}
