<style>
    .wp-password-hash-generator-wrapper table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    .wp-password-hash-generator-wrapper td.wphg-title {
        font-weight: bold;
    }

    .wp-password-hash-generator-wrapper .wphg-error {
        color: red;
    }

    .wp-password-hash-generator-wrapper button.wphg-btn-cp-clipboard {
        float: right;
        cursor: pointer;
    }

    .wp-password-hash-generator-wrapper button.wphg-btn-generate {
        float: right;
        cursor: pointer;
    }

    .wp-password-hash-generator-wrapper td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
    .wp-password-hash-generator-wrapper textarea {
        width: 100%;
    }
    .wp-password-hash-generator-wrapper input {
        width: 80%;
    }
    .wp-password-hash-generator-wrapper input, button{
        vertical-align:middle;
    }
</style>
<div class="wp-password-hash-generator-wrapper">
    <table>
        <tr>
            <td class="wphg-title"><?php echo $password; ?> <button title="Copy to clipboard" class="wphg-btn-cp-clipboard">C</button></td>
            <td>
                <input type="text" name="input_password" required placeholder="Enter the password">
                <button class="wphg-btn-generate">Generate</button>
                <small class="wphg-error" style="display: none">The field is required.</small>
            </td>
        </tr>
        <tr>
            <td class="wphg-title"><?php echo $hash; ?> <button title="Copy to clipboard" class="wphg-btn-cp-clipboard">C</button></td>
            <td>
                <textarea readonly name="generated_hash" placeholder="The hash will be generated here." id="generated_hash" cols="30" rows="5"></textarea>
            </td>
        </tr>
        <tr>
            <td class="wphg-title"><?php echo $sql; ?> <button title="Copy to clipboard" class="wphg-btn-cp-clipboard">C</button></td>
            <td>
                <textarea readonly name="generated_sql" placeholder="The sql query will be generated here." id="generated_sql" cols="30" rows="5"></textarea>
            </td>
        </tr>
        <tr>
            <td class="wphg-title"><?php echo $compatibility; ?></td>
            <td><?php echo $compatibilityValue; ?></td>
        </tr>
    </table>
</div>