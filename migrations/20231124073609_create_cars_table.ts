import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
        table.bigIncrements("id").primary();
        table.string("name", 30).notNullable();
        table.string("type", 30).notNullable();
        table.integer("price", 30).notNullable();
        table.text("profile_picture_url");
        table.bigInteger("create_by");
        table.bigInteger("update_by");
        table.bigInteger("delete_by");
        table.timestamp("create_at");
        table.timestamp("update_at");
        table.timestamp("delete_at");
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("cars");
}

